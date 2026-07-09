import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Table } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import CommonSection from '../shared/CommonSection';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; 

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [editBookingId, setEditBookingId] = useState(null);
  const [editGuestSize, setEditGuestSize] = useState(1);

  useEffect(() => {
    // Fetch latest user details on mount
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${user._id}`);
        const result = await res.json();
        if (res.ok) {
          setFormData({
            username: result.data.username || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            address: result.data.address || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
          credentials: 'include'
        });
        const result = await res.json();
        if (res.ok) {
          setBookings(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    if (user?._id) {
      fetchUser();
      fetchBookings();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        setMessage(result.message || 'Failed to update profile.');
      } else {
        setMessage('Profile updated successfully!');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { ...user, username: formData.username }
        });
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if(!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`${BASE_URL}/booking/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== id));
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      alert("Error deleting booking");
    }
  };

  const handleUpdateBooking = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ guestSize: editGuestSize })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, guestSize: editGuestSize } : b));
        setEditBookingId(null);
      } else {
        alert("Failed to update booking.");
      }
    } catch (err) {
      alert("Error updating booking");
    }
  };

  if (!user) {
    return <h4 className="text-center pt-5">Please login to view your profile.</h4>;
  }

  return (
    <>
      <CommonSection title={`${user.username}'s Profile`} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="10" className="m-auto">
              <div className="profile__card">
                <div className="profile__tabs d-flex gap-4">
                  <button 
                    className={`profile__tab ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Profile Details
                  </button>
                  <button 
                    className={`profile__tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    My Bookings
                  </button>
                </div>

                {activeTab === 'details' && (
                  <div className="profile__info-form">
                    <div className="text-center mb-5">
                      <h2 className="mb-2">Account Settings</h2>
                      <p className="text-muted">Update your personal information and address</p>
                      {message && <h5 className={`mt-3 ${message.includes('success') ? 'text-success' : 'text-danger'}`}>{message}</h5>}
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <label>Username</label>
                        <input
                          type="text"
                          id="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled 
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Phone Number</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Physical Address</label>
                        <textarea
                          id="address"
                          placeholder="Enter your full address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                        ></textarea>
                      </FormGroup>

                      <div className="text-center mt-5">
                        <Button 
                          className="btn primary__btn w-100" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div>
                    <div className="mb-4">
                      <h2>Your Booked Tours</h2>
                      <p className="text-muted">Manage your upcoming travel plans</p>
                    </div>

                    {bookings.length === 0 ? (
                      <h5 className="text-center mt-5 text-muted">You have no bookings yet. Time to explore!</h5>
                    ) : (
                      <div className="table-responsive">
                        <Table className="booking__table align-middle text-center" hover>
                          <thead>
                            <tr>
                              <th>Tour Name</th>
                              <th>Date</th>
                              <th>Guests</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map(booking => (
                              <tr key={booking._id}>
                                <td className="text-start"><strong>{booking.tourName}</strong></td>
                                <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                                <td>
                                  {editBookingId === booking._id ? (
                                    <input 
                                      type="number" 
                                      min="1" 
                                      value={editGuestSize} 
                                      onChange={(e) => setEditGuestSize(Number(e.target.value))}
                                      style={{ width: '60px', padding: '0.2rem', borderRadius: '3px', border: '1px solid #ccc', margin: '0 auto' }}
                                    />
                                  ) : (
                                    booking.guestSize
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex justify-content-center gap-2">
                                    {editBookingId === booking._id ? (
                                      <>
                                        <Button color="success" size="sm" onClick={() => handleUpdateBooking(booking._id)}>Save</Button>
                                        <Button color="secondary" size="sm" onClick={() => setEditBookingId(null)}>Cancel</Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button color="info" size="sm" onClick={() => navigate('/invoice', { state: { booking } })}>
                                          <i className="ri-file-download-line"></i> Invoice
                                        </Button>
                                        <Button color="warning" size="sm" onClick={() => { setEditBookingId(booking._id); setEditGuestSize(booking.guestSize); }}>
                                          <i className="ri-edit-line"></i> Edit
                                        </Button>
                                        <Button color="danger" size="sm" onClick={() => handleDeleteBooking(booking._id)}>
                                          <i className="ri-delete-bin-line"></i> Cancel
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Profile;

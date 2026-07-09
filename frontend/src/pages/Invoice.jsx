import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, tourPrice } = location.state || {};

  if (!booking) {
    return (
      <Container className="pt-5 text-center">
        <h4>No invoice data found.</h4>
        <Button className="btn primary__btn mt-3" onClick={() => navigate('/')}>Go to Home</Button>
      </Container>
    );
  }

  const serviceFee = 10;
  const price = tourPrice || 99; // Fallback
  const guestSize = Number(booking.guestSize) || 1;
  const totalAmount = (price * guestSize) + serviceFee;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <motion.div 
              className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                  <h2 className="text-[2rem] font-bold text-primary mb-1">INVOICE</h2>
                  <p className="text-gray-500 text-sm">Booking ID: {booking._id}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-heading font-semibold text-lg">Tour World</h4>
                  <p className="text-gray-500 text-sm">contact@tourworld.com</p>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <div>
                  <h5 className="text-heading font-semibold mb-2">Billed To:</h5>
                  <p className="text-gray-600 mb-0">{booking.fullName}</p>
                  <p className="text-gray-600 mb-0">{booking.userEmail}</p>
                  <p className="text-gray-600 mb-0">{booking.phone}</p>
                </div>
                <div className="text-right">
                  <h5 className="text-heading font-semibold mb-2">Tour Details:</h5>
                  <p className="text-gray-600 mb-0"><span className="font-medium">Tour:</span> {booking.tourName}</p>
                  <p className="text-gray-600 mb-0"><span className="font-medium">Date:</span> {new Date(booking.bookAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border rounded-xl overflow-hidden mb-8">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4 text-heading font-semibold">Description</th>
                      <th className="py-3 px-4 text-heading font-semibold">Guests</th>
                      <th className="py-3 px-4 text-heading font-semibold">Price</th>
                      <th className="py-3 px-4 text-heading font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4 text-gray-600">{booking.tourName} Booking</td>
                      <td className="py-4 px-4 text-gray-600">{guestSize}</td>
                      <td className="py-4 px-4 text-gray-600">${price}</td>
                      <td className="py-4 px-4 text-gray-600 text-right">${price * guestSize}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Service Fee</td>
                      <td className="py-4 px-4 text-gray-600">-</td>
                      <td className="py-4 px-4 text-gray-600">-</td>
                      <td className="py-4 px-4 text-gray-600 text-right">${serviceFee}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end border-t pt-4">
                <div className="w-1/2">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium text-lg">Total Amount:</span>
                    <span className="text-primary font-bold text-2xl">${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8 no-print">
                <Button className="btn secondary__btn" onClick={() => navigate('/profile')}>Go to Profile</Button>
                <Button className="btn primary__btn" onClick={handlePrint}>Print Invoice</Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          header, footer { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Invoice;

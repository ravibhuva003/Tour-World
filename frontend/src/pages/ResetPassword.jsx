import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { BASE_URL } from "../utils/config";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      setMessage(result.message);
      if (res.ok) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <section className="login__page">
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <motion.div 
              className="login__container d-flex flex-column align-items-center justify-content-center"
              style={{ padding: "40px" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4">Enter New Password</h2>
              <Form onSubmit={handleSubmit} className="w-100">
                <FormGroup>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      borderRadius: "10px",
                      border: "2px solid rgba(0,0,0,0.05)",
                    }}
                  />
                </FormGroup>
                <Button className="btn primary__btn auth__btn mt-3 w-100" type="submit">
                  Save Password
                </Button>
              </Form>
              {message && <p className="mt-4 text-center text-primary">{message}</p>}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;

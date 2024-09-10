import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    // Basic email format validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      return 'Invalid email address';
    }
    return '';
  };

  const validateOtp = (value) => {
    if (!value) {
      return 'OTP is required';
    }
    // Validate OTP length
    if (value.length !== 6) {
      return 'OTP must be 6 digits';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }
    // Validate password length
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setMessage('');
    const emailError = validateEmail(email);
    const otpError = validateOtp(otp);
    const passwordError = validatePassword(password);
    if (emailError || otpError || passwordError) {
      setErrors({ email: emailError, otp: otpError, password: passwordError });
      return;
    }
    setErrors({});
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5500/api/verify-otp-and-update-password', {
        email,
        otp,
        newPassword: password,
      });
      setMessage(response.data.message);
      navigate('/reset-password');
    } catch (error) {
      setMessage(error.response.data.message || 'Error resetting password.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                    placeholder="Enter OTP"
                    required
                  />
                  {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter new password"
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
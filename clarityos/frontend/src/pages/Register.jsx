import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', formData);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { width: '0%', color: 'transparent' };
    if (p.length < 6) return { width: '33%', color: 'var(--red)' };
    if (p.length < 10) return { width: '66%', color: 'var(--amber)' };
    return { width: '100%', color: 'var(--green)' };
  };
  const strength = getPasswordStrength();

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">ClarityOS <span></span></div>
        <div className="auth-left-copy">
          <h2>Start fresh,<br />stay clear.</h2>
          <p>Join thousands who use ClarityOS to stay on top of their work, every single day.</p>
        </div>
        <div className="auth-dots">
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <h1>Create account</h1>
          <p className="auth-sub">Get started — it's completely free</p>
          {error && <div className="alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Min. 6 characters" onChange={handleChange} required />
              <div className="strength-bar"><div className="strength-fill" style={{ width: strength.width, background: strength.color }}></div></div>
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input type="password" name="confirmPassword" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
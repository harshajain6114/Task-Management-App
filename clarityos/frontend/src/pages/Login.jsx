import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">ClarityOS <span></span></div>
        <div className="auth-left-copy">
          <h2>Your tasks,<br />crystal clear.</h2>
          <p>A simple, beautiful way to manage what matters — built for people who get things done.</p>
        </div>
        <div className="auth-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <h1>Welcome back</h1>
          <p className="auth-sub">Sign in to continue to ClarityOS</p>
          {error && <div className="alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="auth-switch">No account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
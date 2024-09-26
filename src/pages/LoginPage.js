import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-api-url.com/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store the user role
      window.location.href = '/dashboard'; // Redirect to dashboard after login
    } catch (error) {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Login Card */}
      <div className="card shadow-lg p-4" style={{ maxWidth: '1200px', minWidth: '800px', width: '100%' }}>
        <div className="row g-0">
          {/* Left Image Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ overflow: 'hidden' }}>
            <img
              src="https://blog.lifeqisystem.com/hubfs/Artboard%201-1.jpg#keepProtocol"
              alt="login form"
              className="img-fluid rounded-start"
              style={{ width: '100%' }} // Fixed image size at full width
            />
          </div>

          {/* Right Form Section */}
          <div className="col-md-6">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row mt-2 align-items-center">
                <i className="fas fa-cubes fa-3x me-3" style={{ color: '#ff6219' }}></i>
                <span className="h1 fw-bold mb-0">E com</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign into your account
              </h5>

              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Login
                </button>
              </form>

              <a className="small text-muted mt-3" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2 mt-2" style={{ color: '#393f81' }}>
                Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Contact admin</a>
              </p>

              <div className="d-flex flex-row justify-content-start mt-auto">
                <a href="#!" className="small text-muted me-1">Terms of use</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

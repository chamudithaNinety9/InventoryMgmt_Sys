import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginHeader from './LoginHeader';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    // Simulate server-side authentication
    if (username === 'seller' && password === '123') {
      // Ideally, this would involve an API call to verify credentials
      navigate('/seller-dashboard');
    } else if (username === 'admin' && password === '123') {
      // Same here, an API call for authentication
      navigate('/admin-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <LoginHeader />
      <div className="container-fluid">
        <div className="text-center my-5">
          <h1 style={{ fontSize: '4.5rem', color: '#210486', fontWeight: 'bold' }}>FEMININE</h1>
        </div>
        <div className="row justify-content-center align-items-center min-vh-90">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

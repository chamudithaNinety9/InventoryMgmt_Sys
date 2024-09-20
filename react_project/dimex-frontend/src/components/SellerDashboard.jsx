import React from 'react';
import { Link } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SellerDashboard() {
  return (
    <div>
      <SellerHeader />
      <div className="hero-section bg-light text-center py-5 mb-5">
        <h1 className="display-4" style={{ fontSize: '3.5rem', color: '#0C8D93', fontWeight: 'bold' }}>Welcome to Seller Dashboard</h1>
        <p className="lead">Manage your items, customers, and more</p>
      </div>
      <div className="container">
        <div className="row">
          {/* Card Template */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-box fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Selling Item</h2>
                <Link to="/add-selling" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-list-alt fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">View Selling Item</h2>
                <Link to="/seller-selling" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-info-circle fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">View Item Details</h2>
                <Link to="/seller-item" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-user-plus fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Add Customer</h2>
                <Link to="/add-customer" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-users fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">View Customer Details</h2>
                <Link to="/list-customer" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-list-alt fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Return Item Details</h2>
                <Link to="/list-return" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

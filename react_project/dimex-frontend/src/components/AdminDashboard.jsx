import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import CreditPurchaseService from '../services/CreditPurchaseService'; // Import your service here
import '@fortawesome/fontawesome-free/css/all.min.css';


function AdminDashboard() {
  const [, setCreditPurchases] = useState([]);
  const [, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reminderCount, setReminderCount] = useState(0); // New state for reminder count
  const [reminders, setReminders] = useState([]); // New state for reminders list
  const [showReminders, setShowReminders] = useState(false); // State to toggle visibility
  
  // State for current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    CreditPurchaseService.getCreditPurchases()
      .then((res) => {
        setCreditPurchases(res.data);
        setLoading(false);
        sendReminders(res.data); // Call the reminder function after data is loaded
      })
      .catch((err) => {
        setError('Failed to fetch credit purchases');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const sendReminders = (purchases) => {
    const today = new Date();
    let count = 0;
    const reminderList = [];

    purchases.forEach((purchase) => {
      const payDate = new Date(purchase.endDate);
      const reminderDate = new Date(payDate);
      reminderDate.setDate(payDate.getDate() - 3);

      if (today >= reminderDate && today <= payDate) {
        count++;
        reminderList.push(`Payment for ${purchase.supName} is due on ${purchase.endDate}. Amount: Rs. ${purchase.creditAmount}.`);
      }
    });

    setReminderCount(count); // Set the reminder count
    setReminders(reminderList); // Set the reminders list
  };

  const handleToggleReminders = () => {
    setShowReminders(!showReminders); // Toggle the visibility of reminders
  };

  return (
    <div>
      <AdminHeader />
      <div className="hero-section bg-light text-center py-5 mb-5">
        <h1 className="display-4" style={{ fontSize: '3.5rem', color: '#0C8D93', fontWeight: 'bold' }}>Welcome to Admin Dashboard</h1>
        <p className="lead">Manage your suppliers, items, categories, and more</p>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-12 text-right mb-4">
            {/* Notification Bell Icon */}
            <div className="notification-icon" onClick={handleToggleReminders}>
              <i className="fas fa-bell fa-2x text-primary"></i>
              {reminderCount > 0 && (
                <span style={{ color: 'DarkRed', fontWeight: 'bold', marginLeft: '5px' }}>
                  ({reminderCount})
                </span>
              )}
            </div>
            <div className="col-12 mb-4" style={{ textAlign: 'right' }}>
            <p>{currentDateTime}</p>
          </div>
          </div>

          {showReminders && (
            <div className="col-12 mb-4">
              <div>
                <h4>Reminders:</h4>
                <ul>
                  {reminders.map((reminder, index) => (
                    <li key={index}>{reminder}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Card Template */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-plus-circle fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Add Item</h2>
                <Link to="/add-item" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div> 
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-tasks fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Selling</h2>
                <Link to="/list-selling" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-info-circle fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Item Details</h2>
                <Link to="/list-item" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-shopping-cart fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Add Purchase Order</h2>
                <Link to="/add-purchase" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-tags fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Credit Purchase</h2>
                <Link to="/list-credit" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-list-ul fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Category</h2>
                <Link to="/list-category" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-users fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Supplier</h2>
                <Link to="/list-supplier" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-clipboard-list fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Manage Purchase Order</h2>
                <Link to="/list-purchase" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-info-circle fa-3x text-primary"></i>
                </div>
                <h2 className="card-title h4">Damage Item Return</h2>
                <Link to="/list-damage" className="btn btn-outline-primary mt-3">GO</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

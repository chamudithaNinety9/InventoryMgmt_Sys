import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import SellerHeader from './SellerHeader';

const ViewCustomerComponent = () => {
  const [customer, setCustomer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await CustomerService.getCustomerById(id);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  const labelStyle = {
    fontWeight: 'bold',
  };

  const cardStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  };

  const rowStyle = {
    marginBottom: '15px',
  };

  return (
    <div>
      <SellerHeader />
      <br />
      <div className="card" style={cardStyle}>
        <h3 className="text-center">View Customer Details</h3>
        <div className="card-body">
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Customer Name:</label>
            <div>{customer.cusName}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Category</label>
            <div>{customer.cusCategory}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Date:</label>
            <div>{customer.cusDate}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Phone:</label>
            <div>{customer.cusPhone}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerComponent;

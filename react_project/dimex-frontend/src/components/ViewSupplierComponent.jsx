import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupplierService from '../services/SupplierService';

const ViewSupplierComponent = () => {
  const [supplier, setSupplier] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await SupplierService.getSupplierById(id);
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    fetchSupplier();
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
      <br />
      <div className="card" style={cardStyle}>
        <h3 className="text-center">View Supplier Details</h3>
        <div className="card-body">
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Supplier Name:</label>
            <div>{supplier.supName}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Date</label>
            <div>{supplier.supDate}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Address:</label>
            <div>{supplier.supAddress}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Phone No:</label>
            <div>{supplier.supPhone}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewSupplierComponent;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PurchaseOrderService from '../services/PurchaseOrderService';

const ViewPurchaseOrderComponent = () => {
  const [purchase, setPurchaseOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await PurchaseOrderService.getPurchaseOrderById(id);
        setPurchaseOrder(response.data);
      } catch (error) {
        console.error('Error fetching purchase:', error);
      }
    };

    fetchPurchaseOrder();
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
        <h3 className="text-center">View Purchase Order Details</h3>
        <div className="card-body">
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Item Code:</label>
            <div>{purchase.itemCode}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Item Category:</label>
            <div>{purchase.itemCategory}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Item Name:</label>
            <div>{purchase.itemName}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Date</label>
            <div>{purchase.purchDate}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Unit Price:</label>
            <div>{purchase.unitPrice}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>QTY:</label>
            <div>{purchase.purchQTY}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Total:</label>
            <div>{purchase.purchTotal}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Supplier Name:</label>
            <div>{purchase.supName}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewPurchaseOrderComponent;

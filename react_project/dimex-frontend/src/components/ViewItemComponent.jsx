import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';

const ViewItemComponent = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ItemService.getItemById(id);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
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
        <h3 className="text-center">View Item Details</h3>
        <div className="card-body">
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Item Code:</label>
            <div>{item.itemCode}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Category:</label>
            <div>{item.itemCategory}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Item Name:</label>
            <div>{item.itemName}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Marked Price</label>
            <div>{item.markedPrice}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>Sell Price:</label>
            <div>{item.sellPrice}</div>
          </div>
          <div className="row" style={rowStyle}>
            <label style={labelStyle}>QTY:</label>
            <div>{item.itemQty}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewItemComponent;

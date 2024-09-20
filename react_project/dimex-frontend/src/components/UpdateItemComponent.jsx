import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';

const UpdateItemComponent = () => {
  const { id } = useParams();
  const [itemCode, setitemCode] = useState('');
  const [itemCategory, setitemCategory] = useState('');
  const [itemName, setitemName] = useState('');
  const [markedPrice, setmarkedPrice] = useState('');
  const [sellPrice, setsellPrice] = useState('');
  const [itemQty, setitemQty] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ItemService.getItemById(id);
        const item = response.data;

        setitemCode(item.itemCode);
        setitemCategory(item.itemCategory);
        setitemName(item.itemName);
        setmarkedPrice(item.markedPrice);
        setsellPrice(item.sellPrice);
        setitemQty(item.itemQty);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const updateItem = async (e) => {
    e.preventDefault();
    const item = { itemCode, itemCategory, itemName, markedPrice, sellPrice, itemQty };

    try {
      await ItemService.updateItem(item, id);
      navigate('/list-item');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Number validation for `itemQty`, `markedPrice`, and `sellPrice`
    if ((name === 'itemQty' || name === 'markedPrice' || name === 'sellPrice') && (isNaN(value) || value < 0)) {
      return;
    }

    switch (name) {
      case 'itemCode':
        setitemCode(value);
        break;
      case 'itemCategory':
        setitemCategory(value);
        break;
      case 'itemName':
        setitemName(value);
        break;
      case 'markedPrice':
        setmarkedPrice(value);
        break;
      case 'sellPrice':
        setsellPrice(value);
        break;
      case 'itemQty':
        setitemQty(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Item</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Item Code:</label>
                  <input
                    name="itemCode"
                    className="form-control"
                    value={itemCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Category:</label>
                  <input
                    name="itemCategory"
                    className="form-control"
                    value={itemCategory}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Item Name:</label>
                  <input
                    name="itemName"
                    className="form-control"
                    value={itemName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Marked Price:</label>
                  <input
                    name="markedPrice"
                    className="form-control"
                    value={markedPrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Sell Price:</label>
                  <input
                    name="sellPrice"
                    className="form-control"
                    value={sellPrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>QTY:</label>
                  <input
                    name="itemQty"
                    className="form-control"
                    value={itemQty}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-success" onClick={updateItem}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/list-item')}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemComponent;

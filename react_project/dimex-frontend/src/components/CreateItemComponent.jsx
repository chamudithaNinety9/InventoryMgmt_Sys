import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const CreateItemComponent = () => {
  const [state, setState] = useState({
    itemCode: '',
    itemCategory: '',
    itemName: '',
    markedPrice: '',
    sellPrice: '',
    itemQty: '',
    categories: [], // Fixed name from categorys to categories
    sellingItems: [],
    errors: {
      itemCode: '',
      itemCategory: '',
      itemName: '',
      markedPrice: '',
      sellPrice: '',
      itemQty: ''
    },
    filteredCategory: []
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.itemName !== '') {
      generateItemCode();
    }
    fetchCategory();
  }, [state.itemName]);

  const fetchCategory = () => {
    CategoryService.getCategorys()
      .then((response) => {
        const categoriesData = response.data;
        setState((prevState) => ({
          ...prevState,
          categories: categoriesData,
          filteredCategory: categoriesData
        }));
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const generateItemCode = () => {
   const prefix = 'FN';
  
   // Retrieve the last item code from localStorage or initialize to 0 if not found
   let lastItemCode = parseInt(localStorage.getItem('lastItemCode'), 10) || 0;
  
   // Increment the last item code by 1
   lastItemCode++;
  
   // Generate the next item code with the prefix and padded number
   const nextItemCode = `${prefix}${lastItemCode.toString().padStart(4, '0')}`;
  
   // Update the state with the new item code
   setState((prevState) => ({ ...prevState, itemCode: nextItemCode }));
  
   // Store the updated last item code back to localStorage
   localStorage.setItem('lastItemCode', lastItemCode.toString());
 };


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Number validation for `itemQty`, `markedPrice`, and `sellPrice`
    if ((name === 'itemQty' || name === 'markedPrice' || name === 'sellPrice') && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: isNaN(value) ? `${name === 'itemQty' ? 'QTY' : name === 'markedPrice' ? 'Marked Price' : 'Sell Price'} must be a number` : `${name === 'itemQty' ? 'QTY' : name === 'markedPrice' ? 'Marked Price' : 'Sell Price'} must be a positive number`
        }
      }));
      return;
    }
  
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: '' // Clear the error if the input is valid
      }
    }));
  };
  
  const validateForm = () => {
    const { itemCode, itemName, itemCategory, markedPrice, sellPrice, itemQty } = state;
    const errors = {
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      itemCategory: itemCategory === '' ? 'Category is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      markedPrice: markedPrice === '' ? 'Marked Price is required' : '',
      sellPrice: sellPrice === '' ? 'Sell Price is required' : ''
    };

    setState({ ...state, errors });
    return !Object.values(errors).some(error => error !== '');
  };

  const addItem = () => {
    if (validateForm()) {
      const newItem = { ...state };
      delete newItem.errors;
      setState(prevState => ({
        ...prevState,
        sellingItems: [...prevState.sellingItems, newItem],
        itemCode: '',
        itemCategory: '',
        itemName: '',
        markedPrice: '',
        sellPrice: '',
        itemQty: ''
      }));
    }
  };

  const handleDeleteItem = (index) => {
    setState(prevState => ({
      ...prevState,
      sellingItems: prevState.sellingItems.filter((_, i) => i !== index)
    }));
  };

  const saveAllItems = () => {
    if (state.sellingItems.length > 0) {
      if (ItemService.createItems) {
        ItemService.createItems(state.sellingItems)
          .then(() => {
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
              navigate('/add-item');
            }, 1000);
          })
          .catch(error => {
            console.error('Error saving items:', error);
          });
      } else {
        Promise.all(state.sellingItems.map(item => ItemService.createItem(item)))
          .then(() => {
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
              navigate('/add-item');
              window.location.reload(); // Refresh the page
            }, 1000);
          })
          .catch(error => {
            console.error('Error saving items:', error);
          });
      }
    }
  };

  const { errors, sellingItems, categories } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
        <h2 className="text-center">Add New Item</h2>
        <br />
        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Items saved successfully!
          </div>
        )}
        <div className="row">
          <div className="card col-md-8 offset-md-2">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <input
                    type='hidden'
                    name="itemCode"
                    className={`form-control ${errors.itemCode ? 'is-invalid' : ''}`}
                    value={state.itemCode}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.itemCode}</div>
                </div>
                
                <div className="form-group mb-3">
                  <label>Item Category:</label>
                  <input
                    id="itemCategory"
                    name="itemCategory"
                    className={`form-control ${errors.itemCategory ? 'is-invalid' : ''}`}
                    value={state.itemCategory}
                    onChange={handleChange}
                    list="itemCategorys"
                  />
                  <div className="invalid-feedback">{errors.itemCategory}</div>
                  <datalist id="itemCategorys">
                    {categories.map((item, index) => (
                      <option key={index} value={item.itemCategory} />
                    ))}
                  </datalist>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemName">Item Name:</label>
                      <input
                        name="itemName"
                        className={`form-control ${errors.itemName ? 'is-invalid' : ''}`}
                        value={state.itemName}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.itemName}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemQty">QTY:</label>
                      <input
                        name="itemQty"
                        className={`form-control ${errors.itemQty ? 'is-invalid' : ''}`}
                        value={state.itemQty}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.itemQty}</div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="markedPrice">Marked Price:</label>
                      <input
                        name="markedPrice"
                        className={`form-control ${errors.markedPrice ? 'is-invalid' : ''}`}
                        value={state.markedPrice}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.markedPrice}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sellPrice">Sell Price:</label>
                      <input
                        name="sellPrice"
                        className={`form-control ${errors.sellPrice ? 'is-invalid' : ''}`}
                        value={state.sellPrice}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.sellPrice}</div>
                    </div>
                  </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={addItem}>
                  Add Item
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <h4>Added Items</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Marked Price</th>
                  <th>Sell Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellingItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemCode}</td>
                    <td>{item.itemName}</td>
                    <td>{item.markedPrice}</td>
                    <td>{item.sellPrice}</td>
                    <td>{item.itemQty}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-success" onClick={saveAllItems}>
              Save All Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItemComponent;

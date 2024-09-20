import React, { useState, useEffect } from 'react';
import ReturnItemService from '../services/ReturnItemService';
import PurchaseOrderService from '../services/PurchaseOrderService';
import ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import SellerHeader from './SellerHeader';

const CreateReturnItemComponent = () => {
  const [state, setState] = useState({
    itemCode: 'FN',
    itemName: '',
    sellDate: new Date().toISOString().slice(0, 10),
    sellPrice: '',
    itemQty: '',
    discount: '',
    sellTotal: '',
    sellTime: moment().tz('Asia/Colombo').format('hh:mm A'),
    unitPrice: '',
    errors: {},
    items: [],
    filteredItems: []
  });

  const [sellingItems, setReturnItems] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    const interval = setInterval(() => {
      setCurrentTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchItems = () => {
    ItemService.getItems()
      .then((response) => {
        const itemsData = response.data;
        setState((prevState) => ({
          ...prevState,
          items: itemsData,
          filteredItems: itemsData
        }));
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  };

  const setCurrentTime = () => {
    const currentTime = moment().tz('Asia/Colombo').format('hh:mm A');
    setState((prevState) => ({
      ...prevState,
      sellTime: currentTime
    }));
  };

  const fetchItemCode = (selectedItemCode) => {
    const selectedItem = state.items.find((item) => item.itemCode === selectedItemCode);
    if (selectedItem) {
      setState((prevState) => ({
        ...prevState,
        itemName: selectedItem.itemName,
        sellPrice: selectedItem.sellPrice,
        errors: { ...prevState.errors, itemCode: '' }
      }));

      PurchaseOrderService.getPurchaseOrders()
        .then((response) => {
          const purchaseOrders = response.data.filter((order) => order.itemCode === selectedItemCode);
          if (purchaseOrders.length > 0) {
            const totalUnitPrice = purchaseOrders.reduce((total, order) => total + parseFloat(order.unitPrice), 0);
            const finalUnitPrice = (totalUnitPrice / purchaseOrders.length).toFixed(2);

            setState((prevState) => ({
              ...prevState,
              unitPrice: finalUnitPrice
            }));
          }
        })
        .catch((error) => {
          console.error('Error fetching purchase orders:', error);
        });
    } else {
      setState((prevState) => ({
        ...prevState,
        itemName: '',
        sellPrice: '',
        errors: { ...prevState.errors, itemCode: 'Item Code not found' }
      }));
    }
  };

  const fetchItemName = (selectedItemName) => {
    const selectedItem = state.items.find(
      (item) => item.itemName === selectedItemName);
    
    if (selectedItem) {
      const isOutOfStock = selectedItem.itemQty <= 0; // Check if the item is out of stock
  
      setState((prevState) => ({
        ...prevState,
        itemCode: selectedItem.itemCode,
        itemName: selectedItem.itemName,
        sellPrice: selectedItem.sellPrice,
        availableQty: selectedItem.itemQty,
        outOfStock: isOutOfStock, // Set the out-of-stock status
        errors: { ...prevState.errors, itemCode: '' } // Clear the itemCode error
      }));

      PurchaseOrderService.getPurchaseOrders()
      .then((response) => {
        const purchaseOrders = response.data.filter((order) => order.itemName === selectedItemName);
        if (purchaseOrders.length > 0) {
          const totalUnitPrice = purchaseOrders.reduce((total, order) => total + parseFloat(order.unitPrice), 0);
          const finalUnitPrice = (totalUnitPrice / purchaseOrders.length).toFixed(2);

          setState((prevState) => ({
            ...prevState,
            unitPrice: finalUnitPrice
          }));
        } 
      })
      .catch((error) => {
        console.error('Error fetching purchase orders:', error);
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        itemCode: '',
        sellPrice: '',
        availableQty: '',
        outOfStock: false,
        errors: { ...prevState.errors, itemName: '' }
      }));
   }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Number validation for `itemQty` and `discount`
    if ((name === 'itemQty' || name === 'discount') && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: isNaN(value) ? `${name === 'itemQty' ? 'QTY' : 'Discount'} must be a number` : `${name === 'itemQty' ? 'QTY' : 'Discount'} must be a positive number`
        }
      }));
      return;
    }
  
    setState((prevState) => {
      const sellPrice = parseFloat(prevState.sellPrice) || 0;
      const itemQty = parseFloat(name === 'itemQty' ? value : prevState.itemQty) || 0;
      const discount = parseFloat(name === 'discount' ? value : prevState.discount) || 0;
  
      // Calculate sellTotal ensuring discount does not exceed the sellPrice * itemQty
      const sellTotal = Math.max(sellPrice * itemQty - discount, 0).toFixed(2);
  
      return {
        ...prevState,
        [name]: parseFloat(value) || value, // Convert to number if it's `itemQty` or `discount`, otherwise use the string value
        sellTotal,
        errors: {
          ...prevState.errors,
          [name]: ''
        }
      };
    });
  
    if (name === 'itemCode') {
      fetchItemCode(value);
    }
    if (name === 'itemName') {
      fetchItemName(value);
    }
  };
  
  const validateForm = () => {
    const { itemCode, itemName, sellDate, sellTotal, sellPrice, itemQty, sellTime, discount  } = state;
    const errors = {
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      sellDate: sellDate === '' ? 'Return Item date is required' : '',
      sellPrice: sellPrice === '' ? 'Sell Price is required' : '',
      itemQty: itemQty === '' ? 'QTY is required' : isNaN(itemQty) ? 'QTY must be a number' : '',
      discount: discount === '' ? '' : isNaN(discount) ? 'Discount must be a number' : '',
      sellTotal: sellTotal === '' ? 'Total Price is required' : '',
      sellTime: sellTime === '' ? 'Time is required' : ''
    };

    setState({ ...state, errors });
    return !Object.values(errors).some((error) => error !== '');
  };

  const addItem = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newItem = { ...state };
      setReturnItems((prevItems) => [...prevItems, newItem]);
      setState((prevState) => ({
        ...prevState,
        itemCode: 'FN',
        itemName: '',
        sellPrice: '',
        itemQty: '',
        discount: '',
        sellTotal: '',
        errors: {}
      }));
    }
  };

  const handleDeleteItem = (index) => {
    setReturnItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const saveOrUpdateReturnItem = (e) => {
    e.preventDefault();
    if (sellingItems.length > 0) {
      sellingItems.forEach((item) => {
        const { itemCode, itemQty } = item;

        const selectedItem = state.items.find((stateItem) => stateItem.itemCode === itemCode);
        if (!selectedItem) {
          console.error('Item not found');
          return;
        }

        const itemId = selectedItem.id;
        const updatedItem = {
          ...selectedItem,
          itemQty: Number(selectedItem.itemQty) + itemQty
        };

        ItemService.updateItem(updatedItem, itemId)
          .then(() => {
            ReturnItemService.createReturnItem(item)
              .then(() => {
                setShowSuccessAlert(true);
                setTimeout(() => {
                  setShowSuccessAlert(false);
                  setReturnItems([]);
                  setState((prevState) => ({
                    ...prevState,
                    itemCode: 'FN',
                    itemName: '',
                    sellPrice: '',
                    itemQty: '',
                    discount: '',
                    sellTotal: '',
                    errors: {}
                  }));
                  navigate('/add-return');
                  window.location.reload();
                }, 1000);
              })
              .catch(error => {
                console.error('Error creating return record:', error);
              });
          })
          .catch(error => {
            console.error('Error updating item quantity:', error);
          });
      });
    }
  };

  const { errors } = state;

  return (
    <div>
      <SellerHeader />
      <br />
      <div className="container">
        <h2 className="text-center">RETURN ITEM</h2>
        <br />

        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Return Item(s) saved successfully!
          </div>
        )}

        <div className="row">
          <div className="card col-md-8 offset-md-2">
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemCode">Item Code:</label>
                      <input
                        id="itemCode"
                        name="itemCode"
                        className={`form-control ${errors.itemCode ? 'is-invalid' : ''}`}
                        value={state.itemCode}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.itemCode}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemName">Item Name:</label>
                      <input
                        id="itemName"
                        name="itemName"
                        className={`form-control ${errors.itemName ? 'is-invalid' : ''}`}
                        value={state.itemName}
                        onChange={handleChange}
                        list="itemNames"
                      />
                      <div className="invalid-feedback">{errors.itemName}</div>
                      <datalist id="itemNames">
                        {state.filteredItems.map((item, index) => (
                          <option key={index} value={item.itemName} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="discount" className="text-danger">Discount *</label>
                      <input
                        id="discount"
                        name="discount"
                        className={`form-control ${errors.discount ? 'is-invalid' : ''}`}
                        value={state.discount}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.discount}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sellPrice">Sell Price:</label>
                      <input
                        id="sellPrice"
                        name="sellPrice"
                        className={`form-control ${errors.sellPrice ? 'is-invalid' : ''}`}
                        value={state.sellPrice}
                        onChange={handleChange}
                        readOnly
                      />
                      <div className="invalid-feedback">{errors.sellPrice}</div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemQty">QTY:</label>
                      <input
                        id="itemQty"
                        name="itemQty"
                        className={`form-control ${errors.itemQty ? 'is-invalid' : ''}`}
                        value={state.itemQty}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.itemQty}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sellTotal">Total Price:</label>
                      <input
                        id="sellTotal"
                        name="sellTotal"
                        className={`form-control ${errors.sellTotal ? 'is-invalid' : ''}`}
                        value={state.sellTotal}
                        readOnly
                      />
                      <div className="invalid-feedback">{errors.sellTotal}</div>
                    </div>
                  </div>

                  
                </div>

                <div className="row mb-3">
                  
                <div className="col-md-6">
                    <div className="form-group">
     
                      <input
                        id="sellDate"
                        type="hidden"
                        name="sellDate"
                        className={`form-control ${errors.sellDate ? 'is-invalid' : ''}`}
                        value={state.sellDate}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.sellDate}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
          
                      <input
                        type="hidden"
                        id="sellTime"
                        name="sellTime"
                        className={`form-control ${errors.sellTime ? 'is-invalid' : ''}`}
                        value={state.sellTime}
                        onChange={handleChange}
                        readOnly
                      />
                      <div className="invalid-feedback">{errors.sellTime}</div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" onClick={addItem}>
                  Add Return Item
                </button>
              </form>
            </div>
          </div>
        </div>

        <br />

        {sellingItems.length > 0 && (
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3 className="text-center">Selling Items</h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Sell Price</th>
                    <th>Discount</th>
                    <th>Total Price</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellingItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemCode}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemQty}</td>
                      <td>{item.sellPrice}</td>
                      <td>{item.discount}</td>
                      <td>{item.sellTotal}</td>
                      <td>{item.sellTime}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="btn btn-success" onClick={saveOrUpdateReturnItem}>
                Return Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateReturnItemComponent;

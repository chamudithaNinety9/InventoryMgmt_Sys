import React, { useState, useEffect } from 'react';
import SellingService from '../services/SellingService';
import PurchaseOrderService from '../services/PurchaseOrderService';
import ItemService from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import AdminHeader from './AdminHeader';

const UpdateSellingComponent = () => {
  const { id } = useParams(); // Get the selling record ID from the route params
  const [state, setState] = useState({
    itemCode: '',
    itemName: '',
    sellDate: new Date().toISOString().slice(0, 10),
    sellPrice: '',
    itemQty: '',
    discount: '',
    sellTotal: '',
    sellTime: moment().tz('Asia/Colombo').format('hh:mm A'),
    unitPrice: '',
    sellProfit: '',
    availableQty: '',
    errors: {
      itemCode: '',
      itemName: '',
      sellDate: '',
      sellPrice: '',
      itemQty: '',
      discount: '',
      sellTotal: '',
      sellTime: ''
    },
    items: [],
    filteredItems: []
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchSellingRecord(id); // Fetch the selling record data based on the ID

    const interval = setInterval(() => {
      setCurrentTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [id]);

  // Fetch items and set them in state
  const fetchItems = () => {
    ItemService.getItems()
      .then((response) => {
        const itemsData = response.data;
        console.log(itemsData); // Add this for debugging
        setState((prevState) => ({
          ...prevState,
          items: itemsData,
          filteredItems: itemsData
        }));
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Ensure items are loaded before fetching item code
    if (!loading && state.itemCode) {
      fetchItemCode(state.itemCode);
    }
  }, [state.itemCode, loading]);

  const fetchSellingRecord = (id) => {
    SellingService.getSellingById(id)
      .then((response) => {
        const sellingData = response.data;
        setState((prevState) => ({
          ...prevState,
          ...sellingData, // Set the fetched data to state
          sellDate: sellingData.sellDate.slice(0, 10) // Format the date
        }));
      })
      .catch((error) => {
        console.error('Error fetching selling record:', error);
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
    const selectedItem = state.items.find(
      (item) => String(item.itemCode) === String(selectedItemCode) // Ensure types match
    );
    if (selectedItem) {
      setState((prevState) => ({
        ...prevState,
        itemName: selectedItem.itemName,
        sellPrice: selectedItem.sellPrice,
        availableQty: selectedItem.itemQty,
        errors: { ...prevState.errors, itemCode: '' }
      }));

      PurchaseOrderService.getPurchaseOrders()
        .then((response) => {
          const purchaseOrders = response.data.filter(
            (order) => order.itemCode === selectedItemCode
          );
          if (purchaseOrders.length > 0) {
            const totalUnitPrice = purchaseOrders.reduce(
              (total, order) => total + parseFloat(order.unitPrice),
              0
            );
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
        availableQty: '',
        errors: { ...prevState.errors, itemCode: 'Item Code not found' }
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'itemQty' && isNaN(value)) {
      return;
    }

    setState((prevState) => {
      const sellPrice = parseFloat(prevState.sellPrice) || 0;
      const unitPrice = parseFloat(prevState.unitPrice) || 0;
      const itemQty = parseFloat(name === 'itemQty' ? value : prevState.itemQty) || 0;
      const discount = parseFloat(prevState.discount) || 0;
      const updatedValue = name === 'discount' || name === 'itemQty' ? parseFloat(value) || 0 : value;

      const sellTotal = (sellPrice * itemQty - discount).toFixed(2);
      const sellProfit = ((sellPrice - unitPrice) * itemQty - discount).toFixed(2);

      return {
        ...prevState,
        [name]: updatedValue,
        sellTotal,
        sellProfit,
        errors: {
          ...prevState.errors,
          [name]: ''
        }
      };
    });

    if (name === 'itemCode') {
      fetchItemCode(value);
    }
  };

  const validateForm = () => {
    const { itemCode, itemName, sellDate, sellTotal, sellPrice, itemQty, sellTime, discount } = state;
    const errors = {
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      sellDate: sellDate === '' ? 'Selling date is required' : '',
      sellPrice: sellPrice === '' ? 'Sell Price is required' : '',
      itemQty: itemQty === '' ? 'QTY is required' : '',
      sellTotal: sellTotal === '' ? 'Total Price is required' : '',
      sellTime: sellTime === '' ? 'Time is required' : ''
    };

    setState({ ...state, errors });
    return !Object.values(errors).some((error) => error !== '');
  };

  const updateSelling = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { itemQty, availableQty } = state;

      if (parseFloat(itemQty) > parseFloat(availableQty)) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            itemQty: 'Quantity exceeds available stock'
          }
        }));
        return;
      }

      SellingService.updateSelling(state, id)
        .then(() => {
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            navigate('/list-selling'); // Redirect after update
          }, 1000);
        })
        .catch((error) => {
          console.error('Error updating selling record:', error);
        });
    }
  };

  const { errors } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
        <h2 className="text-center">UPDATE SELLING ITEM DETAILS</h2>
        <br />

        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Selling Item(s) updated successfully!
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
                        // Read-only to prevent changing
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
                        readOnly
                      />
                      <div className="invalid-feedback">{errors.itemName}</div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="discount">Discount:</label>
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
                 
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemQty">Quantity:</label>
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
                        onChange={handleChange}
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
                        type="hidden"
                        id="sellDate"
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

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sellProfit">Profit:</label>
                      <input
                        id="sellProfit"
                        name="sellProfit"
                        className="form-control"
                        value={state.sellProfit}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={updateSelling}>
                  Update Selling Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSellingComponent;

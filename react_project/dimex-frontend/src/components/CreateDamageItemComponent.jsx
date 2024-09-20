import React, { useState, useEffect } from 'react';
import DamageItemService from '../services/DamageItemService';
import ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import SupplierService from '../services/SupplierService';
import AdminHeader from './AdminHeader';

const CreateDamageItemComponent = () => {
  const [state, setState] = useState({
    itemCode: 'FN',
    itemName: '',
    sellDate: new Date().toISOString().slice(0, 10),
    itemQty: '',
    supName: '',
    sellTime: moment().tz('Asia/Colombo').format('hh:mm A'),
    errors: {},
    items: [],
    filteredItems: [],
    suppliers: []
  });

  const [sellingItems, setDamageItems] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchSuppliers();
    const interval = setInterval(() => {
      setCurrentTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await SupplierService.getSuppliers();
      setState(prevState => ({ ...prevState, suppliers: response.data }));
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchItems = () => {
    ItemService.getItems()
      .then((response) => {
        const itemsData = response.data;
        setState(prevState => ({
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
    setState(prevState => ({
      ...prevState,
      sellTime: currentTime
    }));
  };

  const fetchItemCode = (selectedItemCode) => {
    const selectedItem = state.items.find((item) => item.itemCode === selectedItemCode);
    if (selectedItem) {
      setState(prevState => ({
        ...prevState,
        itemName: selectedItem.itemName,
        errors: { ...prevState.errors, itemCode: '' }
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        itemName: '',
        errors: { ...prevState.errors, itemCode: 'Item Code not found' }
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'itemQty' && (isNaN(value) || value < 0)) {
      setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: isNaN(value) ? 'QTY must be a number' : 'QTY cannot be negative'
        }
      }));
      return;
    }

    setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: { ...prevState.errors, [name]: '' } // Clear error when value is changed
    }));

    if (name === 'itemCode') {
      fetchItemCode(value);
    }
  };

  const validateForm = () => {
    const { itemCode, itemName, sellDate, itemQty, sellTime } = state;
    const errors = {
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      sellDate: sellDate === '' ? 'Return Item date is required' : '',
      itemQty: itemQty === '' ? 'QTY is required' : '',
      sellTime: sellTime === '' ? 'Time is required' : ''
    };

    setState(prevState => ({ ...prevState, errors }));
    return !Object.values(errors).some(error => error !== '');
  };

  const addItem = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newItem = { ...state };
      setDamageItems(prevItems => [...prevItems, newItem]);
      setState(prevState => ({
        ...prevState,
        itemCode: 'FN',
        itemName: '',
        itemQty: '',
        errors: {}
      }));
    }
  };

  const handleDeleteItem = (index) => {
    setDamageItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const saveOrUpdateDamageItem = (e) => {
    e.preventDefault();
    if (sellingItems.length > 0) {
      Promise.all(sellingItems.map(item => DamageItemService.createDamageItem(item)))
        .then(() => {
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            setDamageItems([]);
            setState(prevState => ({
              ...prevState,
              itemCode: 'FN',
              itemName: '',
              itemQty: '',
              errors: {}
            }));
            navigate('/list-damage');
          }, 1000);
        })
        .catch(error => {
          console.error('Error creating return record:', error);
        });
    }
  };

  const { errors, suppliers } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
        <h2 className="text-center">DAMAGE ITEM RETURN</h2>
        <br />

        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Damage Item(s) saved successfully!
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
                        readOnly
                      />
                      <div className="invalid-feedback">{errors.itemName}</div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Supplier Name:</label>
                    <select
                      name="supName"
                      className={`form-control ${errors.supName ? 'is-invalid' : ''}`}
                      value={state.supName}
                      onChange={(e) =>
                        setState(prevState => ({ ...prevState, supName: e.target.value }))
                      }
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.supName}>
                          {supplier.supName}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">{errors.supName}</div>
                  </div>

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
                      />
                      <div className="invalid-feedback">{errors.sellTime}</div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={addItem}>
                  Add Item
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
                    <th>Supplier Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellingItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemCode}</td>
                      <td>{item.itemName}</td>
                      <td>{item.supName}</td>
                      <td>{item.itemQty}</td>
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

              <button className="btn btn-success" onClick={saveOrUpdateDamageItem}>
                Return Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDamageItemComponent;

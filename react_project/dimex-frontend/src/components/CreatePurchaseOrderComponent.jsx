import React, { useState, useEffect } from 'react';
import PurchaseOrderService from '../services/PurchaseOrderService';
import SupplierService from '../services/SupplierService';
import ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const CreatePurchaseOrderComponent = () => {
  const [state, setState] = useState({
    itemCategory: '',
    itemName: '',
    itemCode: '',
    purchDate: new Date().toISOString().slice(0, 10),
    unitPrice: '',
    purchQTY: '',
    purchTotal: '',
    supName: '',
    items: [],
    filteredItems: [],
    suppliers: [],
    orders: [],
    errors: {
      itemCategory: '',
      itemName: '',
      itemCode: '',
      purchDate: '',
      unitPrice: '',
      purchQTY: '',
      purchTotal: '',
      supName: ''
    }
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
    fetchItems();
  }, []);

  const fetchSuppliers = () => {
    SupplierService.getSuppliers()
      .then(response => {
        const suppliersData = response.data;
        setState(prevState => ({
          ...prevState,
          suppliers: suppliersData
        }));
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  };

  const fetchItems = () => {
    ItemService.getItems()
      .then(response => {
        const itemsData = response.data;
        setState(prevState => ({
          ...prevState,
          items: itemsData,
          filteredItems: itemsData
        }));
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const fetchItemCode = selectedItemName => {
    const selectedItem = state.items.find(item => item.itemName === selectedItemName);
    if (selectedItem) {
      setState(prevState => ({
        ...prevState,
        itemCode: selectedItem.itemCode
      }));
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    if ((name === 'purchQTY' || name === 'unitPrice') && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: isNaN(value) ? `${name === 'purchQTY' ? 'QTY' : 'Unit Price'} must be a number` : `${name === 'purchQTY' ? 'QTY' : 'Unit Price'} must be a positive number`
        }
      }));
      return;
    }
  
    setState(prevState => {
      const unitPrice = parseFloat(prevState.unitPrice) || 0;
      const purchQTY = name === 'purchQTY' ? parseFloat(value) || 0 : parseFloat(prevState.purchQTY) || 0;
      const updatedValue = name === 'unitPrice' || name === 'purchQTY' ? parseFloat(value) || 0 : value;
      const purchTotal = (unitPrice * purchQTY).toFixed(2);
  
      return {
        ...prevState,
        [name]: updatedValue,
        purchTotal: name === 'unitPrice' || name === 'purchQTY' ? purchTotal : prevState.purchTotal,
        errors: {
          ...prevState.errors,
          [name]: ''
        }
      };
    });
  
    if (name === 'itemName') {
      fetchItemCode(value);
    }
  };

  const handleCategoryChange = event => {
    const category = event.target.value;
    const filteredItems = state.items.filter(item => item.itemCategory === category);

    setState(prevState => ({
      ...prevState,
      itemCategory: category,
      filteredItems: filteredItems,
      itemName: '',
      itemCode: ''
    }));
  };

  const validateForm = () => {
    const { itemCategory, itemName, itemCode, purchDate, unitPrice, purchQTY, purchTotal, supName } = state;
    const errors = {
      itemCategory: itemCategory === '' ? 'Category is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      purchDate: purchDate === '' ? 'Date is required' : '',
      unitPrice: unitPrice === '' ? 'Unit Price is required' : !isFinite(unitPrice) || unitPrice <= 0 ? 'Unit Price must be a positive number' : '',
      purchQTY: purchQTY === '' ? 'Quantity is required' : !isFinite(purchQTY) || purchQTY <= 0 ? 'Quantity must be a positive number' : '',
      purchTotal: purchTotal === '' ? 'Total is required' : '',
      supName: supName === '' ? 'Supplier Name is required' : ''
    };
  
    setState(prevState => ({
      ...prevState,
      errors
    }));
  
    return !Object.values(errors).some(error => error !== '');
  };
  

  const addItem = () => {
    if (validateForm()) {
      const newItem = {
        itemCategory: state.itemCategory,
        itemName: state.itemName,
        itemCode: state.itemCode,
        purchDate: state.purchDate,
        unitPrice: state.unitPrice,
        purchQTY: state.purchQTY,
        purchTotal: state.purchTotal,
        supName: state.supName
      };

      setState(prevState => ({
        ...prevState,
        orders: [...prevState.orders, newItem],
        itemCategory: '',
        itemName: '',
        itemCode: '',
        purchDate: new Date().toISOString().slice(0, 10),
        unitPrice: '',
        purchQTY: '',
        purchTotal: '',
        supName: ''
      }));
    }
  };


  const handleDeleteItem = index => {
    setState(prevState => ({
      ...prevState,
      orders: prevState.orders.filter((_, i) => i !== index)
    }));
  };

  const saveOrUpdatePurchaseOrder = e => {
    e.preventDefault();

    if (state.orders.length === 0) {
      setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          general: 'No orders to save.'
        }
      }));
      return;
    }

    state.orders.forEach(order => {
      PurchaseOrderService.createPurchaseOrder(order)
        .then(() => {
          const itemCode = order.itemCode;
          const purchQTY = parseFloat(order.purchQTY);

          const selectedItem = state.items.find(item => item.itemCode === itemCode);

          if (selectedItem) {
            const itemId = selectedItem.id;
            const updatedItem = {
              ...selectedItem,
              itemQty: Number(selectedItem.itemQty) + purchQTY
            };

            ItemService.updateItem(updatedItem, itemId)
              .then(() => {
                setShowSuccessAlert(true);
                setTimeout(() => {
                  setShowSuccessAlert(false);
                  navigate('/add-purchase');
                  window.location.reload();
                }, 500);
              })
              .catch(error => {
                console.error('Error updating item quantity:', error);
              });
          } else {
            console.error('Item not found:', itemCode);
          }
        })
        .catch(error => {
          console.error('Error saving purchase order:', error);
        });
    });
  };

  const { errors } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
        <h2 className="text-center">Add Purchase Order</h2>
        <br />
        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Purchase Order saved successfully!
          </div>
        )}
        {!showSuccessAlert && (
          <div className="row">
            <div className="card col-md-8 offset-md-2">
              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="itemCategory">Item Category:</label>
                        <input
                          id="itemCategory"
                          name="itemCategory"
                          className={`form-control ${errors.itemCategory ? 'is-invalid' : ''}`}
                          value={state.itemCategory}
                          onChange={handleCategoryChange}
                          list="itemCategorys"
                        />
                        <div className="invalid-feedback">{errors.itemCategory}</div>
                        <datalist id="itemCategorys">
                          {Array.from(new Set(state.items.map(item => item.itemCategory))).map((category, index) => (
                            <option key={index} value={category} />
                          ))}
                        </datalist>
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
                      {state.filteredItems.map(item => (
                        <option key={item.id} value={item.itemName} />
                      ))}
                    </datalist>
                  </div>

                    </div>
                  </div>
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
                          readOnly
                        />
                        <div className="invalid-feedback">{errors.itemCode}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="purchDate">Purchase Date:</label>
                        <input
                          type="date"
                          name="purchDate"
                          className={`form-control ${errors.purchDate ? 'is-invalid' : ''}`}
                          value={state.purchDate}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.purchDate}</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label>Unit Price:</label>
                    <input
                      name="unitPrice"
                      className={`form-control ${errors.unitPrice ? 'is-invalid' : ''}`}
                      value={state.unitPrice}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.unitPrice}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="purchQTY">QTY:</label>
                        <input
                          name="purchQTY"
                          className={`form-control ${errors.purchQTY ? 'is-invalid' : ''}`}
                          value={state.purchQTY}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.purchQTY}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="purchTotal">Total:</label>
                        <input
                          name="purchTotal"
                          className={`form-control ${errors.purchTotal ? 'is-invalid' : ''}`}
                          value={state.purchTotal}
                          onChange={handleChange}
                          readOnly
                        />
                        <div className="invalid-feedback">{errors.purchTotal}</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                  <label htmlFor="supName">Supplier Name:</label>
                  <input
                    id="supName"
                    name="supName"
                    className={`form-control ${errors.supName ? 'is-invalid' : ''}`}
                    value={state.supName}
                    onChange={handleChange}
                    list="supNames"
                  />
                  <div className="invalid-feedback">{errors.supName}</div>
                  <datalist id="supNames">
                    {state.suppliers.map((supplier, index) => (
                      <option key={index} value={supplier.supName} />
                    ))}
                  </datalist>
                </div>

                  <button type="button" className="btn btn-primary" onClick={addItem}>
                    Add Item
                  </button>
                  
                </form>
                <br />
                <h3 className="text-center">Purchase Orders</h3>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Category</th>
                      <th>Name</th>
                      <th>Purchase Date</th>
                      <th>Unit Price</th>
                      <th>QTY</th>
                      <th>Total</th>
                      <th>Supplier Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.itemCode}</td>
                        <td>{order.itemCategory}</td>
                        <td>{order.itemName}</td>
                        <td>{order.purchDate}</td>
                        <td>{order.unitPrice}</td>
                        <td>{order.purchQTY}</td>
                        <td>{order.purchTotal}</td>
                        <td>{order.supName}</td>
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
                <button className="btn btn-success ml-3" onClick={saveOrUpdatePurchaseOrder}>
                    Save All Orders
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CreatePurchaseOrderComponent;

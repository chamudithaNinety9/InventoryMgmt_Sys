import React, { useState, useEffect } from 'react';
import SellingService from '../services/SellingService';
import PurchaseOrderService from '../services/PurchaseOrderService';
import ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import SellerHeader from './SellerHeader';
import BillPrint from './BillPrint';

const CreateSellingComponent = () => { 
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
    filteredItems: [],
    outOfStock: false
  });

  const [sellingItems, setSellingItems] = useState([]);
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
    const selectedItem = state.items.find(
      (item) => item.itemCode === selectedItemCode || item.itemName === selectedItemCode);    
    if (selectedItem) {
      const isOutOfStock = selectedItem.itemQty <= 0; // Check if the item is out of stock

      setState((prevState) => ({
        ...prevState,
        itemCode: selectedItem.itemCode,
        itemName: selectedItem.itemName,
        sellPrice: selectedItem.sellPrice,
        availableQty: selectedItem.itemQty,
        outOfStock: isOutOfStock, // Set the out-of-stock status
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
          availableQty: '',
          outOfStock: false,
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
  
    if (name === 'itemQty' && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          itemQty: isNaN(value) ? 'QTY must be a number' : 'QTY must be a positive number'
        }
      }));
      return;
    }
  
    if (name === 'discount' && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          discount: isNaN(value) ? 'Discount must be a number' : 'Discount must be a positive number'
        }
      }));
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

    if (name === 'itemName') {
      fetchItemName(value);
    }
  };
  

  const validateForm = () => {
    const { itemCode, itemName, sellDate, sellTotal, sellPrice, itemQty, sellTime, discount } = state;
    const errors = {
      itemCode: itemCode === '' ? 'Item Code is required' : '',
      itemName: itemName === '' ? 'Item Name is required' : '',
      sellDate: sellDate === '' ? 'Selling date is required' : '',
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
      const { itemQty, availableQty, outOfStock } = state;

      if (outOfStock || parseFloat(itemQty) > parseFloat(availableQty)) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            itemQty: outOfStock ? 'Item is out of stock' : 'Quantity exceeds available stock'
          }
        }));
        return;
      }

      const newItem = { ...state };
      setSellingItems((prevItems) => [...prevItems, newItem]);
      setState((prevState) => ({
        ...prevState,
        itemCode: 'FN',
        itemName: '',
        sellPrice: '',
        itemQty: '',
        discount: '',
        sellTotal: '',
        sellProfit: '',
        availableQty: '',
        errors: {
          itemCode: '',
          itemName: '',
          sellPrice: '',
          itemQty: '',
          discount: '',
          sellTotal: ''
        }
      }));
    }
  };

  const handleDeleteItem = (index) => {
    setSellingItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };


  const handleDownloadPDF = (invoiceNumber) => {
    // Hide the button before generating PDF
    document.getElementById('pdfButton').style.display = 'none';
  
    const doc = new jsPDF();
  
    // Get the element that you want to print
    const printableBill = document.getElementById('printableBill');
  
    // Use the html method to generate PDF from HTML element
    doc.html(printableBill, {
      callback: (doc) => {
        // Save the PDF with the desired filename
        doc.save(`invoice_${invoiceNumber}.pdf`);
  
        // Show the button again after PDF is generated
        document.getElementById('pdfButton').style.display = 'block';
      },
      x: 10,
      y: 10,
      width: 180, // Adjust width if needed
      windowWidth: printableBill.scrollWidth, // Ensures the full content width is captured
    });
  };
  
  const saveOrUpdateSelling = (e) => {
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
          itemQty: selectedItem.itemQty - itemQty
        };

        ItemService.updateItem(updatedItem, itemId)
          .then(() => {
            SellingService.createSelling(item)
              .then(() => {
                setShowSuccessAlert(true);
                setTimeout(() => {
                  setShowSuccessAlert(false);
                  setSellingItems([]); // Clear the sellingItems state
                  setState((prevState) => ({
                    ...prevState,
                    itemCode: 'DX',
                    itemName: '',
                    sellPrice: '',
                    itemQty: '',
                    discount: '',
                    sellTotal: '',
                    sellProfit: '',
                    availableQty: '',
                    errors: {
                      itemCode: '',
                      itemName: '',
                      sellPrice: '',
                      itemQty: '',
                      discount: '',
                      sellTotal: ''
                    }
                  }));
                  navigate('/add-selling'); // Optionally navigate
                  window.location.reload(); // Refresh the page
                }, 1000);
              })
              .catch(error => {
                console.error('Error creating selling record:', error);
              });
          })
          .catch(error => {
            console.error('Error updating item quantity:', error);
          });
      });
    }
  };
  
  
  const { errors, outOfStock } = state;

  return (
    <div>
      <SellerHeader />
      <br />
      <div className="container">
        <h2 className="text-center">SELLING ITEM DETAILS</h2>
        <br />

        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Selling Item(s) saved successfully!
          </div>
        )}

        <div className="row">
          <div className="card col-md-8 offset-md-2">
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemCode" className="form-text text-muted">Item Code:</label>
                      <input
                        id="itemCode"
                        name="itemCode"
                        className={`form-control ${errors.itemCode ? 'is-invalid' : ''}`}
                        value={state.itemCode}
                        onChange={handleChange}
                        list="itemCodes"
                        />
                        <div className="invalid-feedback">{errors.itemCode}</div>
                        <datalist id="itemCodes">
                          {state.filteredItems.map((item, index) => (
                            <option key={index} value={item.itemCode} />
                          ))}
                        </datalist> </div>
                  </div>

                  <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="itemName" className="form-text text-muted">Item Name:</label>
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
                      <label htmlFor="sellPrice" className="form-text text-muted">Sell Price:</label>
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
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="itemQty" className="form-text text-muted">QTY:</label>
                      <input
                        id="itemQty"
                        name="itemQty"
                        className={`form-control ${errors.itemQty ? 'is-invalid' : ''}`}
                        value={state.itemQty}
                        onChange={handleChange}
                        disabled={outOfStock} // Disable quantity input if out of stock
                      />
                      <div className="invalid-feedback">{errors.itemQty}</div>
                      {outOfStock ? (
                        <small className="form-text text-danger">Item is out of stock</small>
                      ) : (
                        <small className="form-text text-muted">Available Qty: {state.availableQty}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sellTotal" className="form-text text-muted">Total:</label>
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

                <button className="btn btn-primary" onClick={addItem}>
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
                  <th>Sell Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total</th>
               
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellingItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemCode}</td>
                    <td>{item.itemName}</td>
                    <td>{item.sellPrice}</td>
                    <td>{item.itemQty}</td>
                    <td>{item.discount}</td>
                    <td>{item.sellTotal}</td>
                  
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
            <button className="btn btn-success" onClick={saveOrUpdateSelling}>
              Save All Items
            </button><br /><br />

            <div style={{ textAlign: 'left', margin: '20px 0' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  document.getElementById('pdfButton').style.display = 'none';
                  
                  const printWindow = window.open('', '', 'height=600,width=800');
                  printWindow.document.open();
                  printWindow.document.write('<html><head><title>Print Bill</title>');
                  printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; } th { background-color: #f2f2f2; } </style>');
                  printWindow.document.write('</head><body>');
                  printWindow.document.write(document.getElementById('printableBill').innerHTML);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.onafterprint = () => {
                    document.getElementById('pdfButton').style.display = 'block';
                  };
                }}
              >
                Print Bill
              </button>
              
            </div>

            <BillPrint sellingItems={sellingItems} date={state.sellDate} time={state.sellTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSellingComponent;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PurchaseOrderService from '../services/PurchaseOrderService';
import ItemService from '../services/ItemService';
import SupplierService from '../services/SupplierService';

const UpdatePurchaseOrderComponent = () => {
  const { id } = useParams();
  const [itemCode, setItemCode] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [purchDate, setPurchDate] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [purchQTY, setPurchQTY] = useState('');
  const [purchTotal, setPurchTotal] = useState('');
  const [supName, setSupName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // Added state for suppliers
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PurchaseOrderService.getPurchaseOrderById(id);
        const purchase = response.data;

        setItemCode(purchase.itemCode);
        setItemCategory(purchase.itemCategory);
        setItemName(purchase.itemName);
        setPurchDate(purchase.purchDate);
        setUnitPrice(purchase.unitPrice);
        setPurchQTY(purchase.purchQTY);
        setPurchTotal(purchase.purchTotal);
        setSupName(purchase.supName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuppliers();
    fetchData();
    fetchItems();
  }, [id]);

  const fetchItems = () => {
    ItemService.getItems()
      .then((response) => {
        const itemsData = response.data;
        setItems(itemsData);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  };

  const fetchItemCode = (selectedItemCode) => {
    const selectedItem = items.find((item) => item.itemCode === selectedItemCode);
    if (selectedItem) {
      setItemCategory(selectedItem.itemCategory);
      setItemName(selectedItem.itemName);
      setErrors((prevErrors) => ({ ...prevErrors, itemCode: '' }));
    } else {
      setItemCategory('');
      setItemName('');
      setErrors((prevErrors) => ({ ...prevErrors, itemCode: 'Item Code not found' }));
    }
  };

  const fetchSuppliers = () => {
    SupplierService.getSuppliers()
      .then(response => {
        const suppliersData = response.data;
        setSuppliers(suppliersData); // Corrected setSuppliers usage
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  };

  const updatePurchaseOrder = async (e) => {
    e.preventDefault();
    const purchase = { itemCode, itemCategory, itemName, purchDate, unitPrice, purchQTY, purchTotal, supName };

    try {
      await PurchaseOrderService.updatePurchaseOrder(purchase, id);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/list-purchase');
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'itemCode':
        setItemCode(value);
        fetchItemCode(value);
        break;
      case 'itemCategory':
        setItemCategory(value);
        break;
      case 'itemName':
        setItemName(value);
        break;
      case 'purchDate':
        setPurchDate(value);
        break;
      case 'unitPrice':
        const updatedUnitPrice = parseFloat(value) || 0;
        setUnitPrice(updatedUnitPrice);
        setPurchTotal((updatedUnitPrice * purchQTY).toFixed(2));
        break;
      case 'purchQTY':
        const updatedPurchQTY = parseFloat(value) || 0;
        setPurchQTY(updatedPurchQTY);
        setPurchTotal((unitPrice * updatedPurchQTY).toFixed(2));
        break;
      case 'supName':
        setSupName(value);
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
            <h3 className="text-center">Update Purchase Order</h3>
            <div className="card-body">
              {showSuccessMessage && (
                <div className="alert alert-success" role="alert">
                  Purchase order updated successfully!
                </div>
              )}
              <form>
                <div className="form-group mb-3">
                  <label>Item Code:</label>
                  <input
                    name="itemCode"
                    className="form-control"
                    value={itemCode}
                    onChange={handleInputChange}
                    list="itemCodes"
                  />
                  <datalist id="itemCodes">
                    {items.map((item) => (
                      <option key={item.itemCode} value={item.itemCode}>
                        {item.itemName}
                      </option>
                    ))}
                  </datalist>
                  {errors.itemCode && (
                    <div className="text-danger">{errors.itemCode}</div>
                  )}
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
                  <label>Date:</label>
                  <input
                    type="date"
                    name="purchDate"
                    className="form-control"
                    value={purchDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Unit Price:</label>
                  <input
                    name="unitPrice"
                    className="form-control"
                    value={unitPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>QTY:</label>
                  <input
                    name="purchQTY"
                    className="form-control"
                    value={purchQTY}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Total:</label>
                  <input
                    name="purchTotal"
                    className="form-control"
                    value={purchTotal}
                    readOnly
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Supplier Name:</label>
                  <select
                      name="supName"
                      className={`form-control ${errors.supName ? 'is-invalid' : ''}`}
                      value={supName} // Corrected value
                      onChange={handleInputChange} // Corrected onChange handler
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(supplier => ( // Corrected suppliers mapping
                        <option key={supplier.id} value={supplier.supName}>
                          {supplier.supName}
                        </option>
                      ))}
                    </select>
                </div>
                <button className="btn btn-success" onClick={updatePurchaseOrder}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/list-purchase')}
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

export default UpdatePurchaseOrderComponent;

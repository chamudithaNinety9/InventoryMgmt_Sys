import React, { useState, useEffect } from 'react';
import CreditPurchaseService from '../services/CreditPurchaseService';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import SupplierService from '../services/SupplierService';

const CreateCreditPurchaseComponent = () => {
  const [state, setState] = useState({
    supName: '',
    purchaseDate: new Date().toISOString().slice(0, 10), // Set initial date to today
    creditPeriod: '',
    endDate: '',
    creditAmount: '',
    creditStatus: 'Not Completed', // Set default credit status to 'Not Completed'
    suppliers: [],
    errors: {
      supName: '',
      purchaseDate: '',
      creditPeriod: '',
      endDate: '',
      creditAmount: '',
      creditStatus: ''
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await SupplierService.getSuppliers();
      setState(prevState => ({ ...prevState, suppliers: response.data }));
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  useEffect(() => {
    if (state.purchaseDate && state.creditPeriod) {
      const newEndDate = new Date(state.purchaseDate);
      newEndDate.setDate(newEndDate.getDate() + parseInt(state.creditPeriod, 10));
      setState(prevState => ({
        ...prevState,
        endDate: newEndDate.toISOString().slice(0, 10)
      }));
    } else {
      setState(prevState => ({ ...prevState, endDate: '' }));
    }
  }, [state.purchaseDate, state.creditPeriod]);

  const validateForm = () => {
    const newErrors = {};
    if (!state.purchaseDate) newErrors.purchaseDate = 'Date is required';
    if (!state.supName) newErrors.supName = 'Supplier is required';
    if (!state.creditPeriod) newErrors.creditPeriod = 'Credit Period is required';
    if (!state.endDate) newErrors.endDate = 'End Date is required';
    if (!state.creditAmount) newErrors.creditAmount = 'Credit Amount is required';
    if (!state.creditStatus) newErrors.creditStatus = 'Credit Status is required';

    setState(prevState => ({ ...prevState, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if ((name === 'creditPeriod' || name === 'creditAmount') && (isNaN(value) || value < 0)) {
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: isNaN(value) ? `${name === 'creditPeriod' ? 'Credit Period' : 'Credit Amount'} must be a number` : `${name === 'creditPeriod' ? 'Credit Period' : 'Credit Amount'} must be a positive number`
        }
      }));
      return;
    }

    setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: '' // Clear the error message if the input is valid
      }
    }));
  };

  const saveOrUpdateCreditPurchase = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const creditPurchase = {
        supName: state.supName,
        purchaseDate: state.purchaseDate,
        creditPeriod: state.creditPeriod,
        endDate: state.endDate,
        creditAmount: state.creditAmount,
        creditStatus: state.creditStatus,
      };
      console.log('creditPurchase => ' + JSON.stringify(creditPurchase));

      try {
        await CreditPurchaseService.createCreditPurchase(creditPurchase);
        navigate('/list-credit');
      } catch (error) {
        console.error('Error saving credit purchase:', error);
      }
    }
  };

  const { suppliers, errors } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
        <h2 className="text-center">Purchase of Credit</h2>
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
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

                <div className="form-group mb-3">
                  <label>Purchase Date:</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    className={`form-control ${errors.purchaseDate ? 'is-invalid' : ''}`}
                    value={state.purchaseDate}
                    onChange={(e) =>
                      setState(prevState => ({ ...prevState, purchaseDate: e.target.value }))
                    }
                  />
                  <div className="invalid-feedback">{errors.purchaseDate}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Credit Period:</label>
                  <input
                   
                    name="creditPeriod"
                    className={`form-control ${errors.creditPeriod ? 'is-invalid' : ''}`}
                    value={state.creditPeriod}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.creditPeriod}</div>
                </div>

                <div className="form-group mb-3">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                    value={state.endDate}
                    readOnly
                  />
                  <div className="invalid-feedback">{errors.endDate}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Credit Amount:</label>
                  <input
                    
                    name="creditAmount"
                    className={`form-control ${errors.creditAmount ? 'is-invalid' : ''}`}
                    value={state.creditAmount}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.creditAmount}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Status:</label>
                  <select
                    name="creditStatus"
                    className={`form-control ${errors.creditStatus ? 'is-invalid' : ''}`}
                    value={state.creditStatus}
                    onChange={(e) =>
                      setState(prevState => ({ ...prevState, creditStatus: e.target.value }))
                    }
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="invalid-feedback">{errors.creditStatus}</div>
                </div>

                <button className="btn btn-primary" onClick={saveOrUpdateCreditPurchase}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCreditPurchaseComponent;

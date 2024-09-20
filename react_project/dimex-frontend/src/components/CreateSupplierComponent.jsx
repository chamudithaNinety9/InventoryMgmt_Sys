import React, { useState } from 'react';
import SupplierService from '../services/SupplierService';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const CreateSupplierComponent = () => {
  const [state, setState] = useState({
    supName: '',
    supDate: new Date().toISOString().slice(0, 10), // Set initial date to today
    supAddress: '',
    supPhone: '',

    errors: {
      supName: '',
      supDate: '',
      supAddress: '',
      supPhone: ''
    }
  });
  const navigate = useNavigate();

  const changePackgeNameHandler = (event) => {
    setState({ ...state, supName: event.target.value });
  };

  const changeDestinationHandler = (event) => {
    setState({ ...state, supDate: event.target.value });
  };

  const changePackgeTypeHandler = (event) => {
    setState({ ...state, supAddress: event.target.value });
  };

  const changeDurationHandler = (event) => {
    // Extracting only digits from the input value
    const phoneNumber = event.target.value.replace(/\D/g, '');
    
    // Limiting the phone number to 10 digits
    const formattedPhoneNumber = phoneNumber.slice(0, 10);
  
    // Checking if the phone number has exactly 10 digits
    const isValidLength = formattedPhoneNumber.length === 10;
  
    // Checking if the input contains letters
    const containsLetters = /[a-zA-Z]/.test(event.target.value);
  
    // Displaying error message based on length and letter insertion
    let errors = {
      ...state.errors,
      supPhone: ''
    };
  
    if (!isValidLength) {
      errors.supPhone = 'Phone number must be exactly 10 digits';
    } else if (containsLetters) {
      errors.supPhone = 'Phone number should contain only numbers';
    }
  
    setState({ 
      ...state, 
      supPhone: formattedPhoneNumber,
      errors: errors
    });
  };
  
  
  const validateForm = () => {
    const { supName, supAddress, supDate, supPhone } = state;
    const errors = {
      supName: supName === '' ? 'Supplier name is required' : '',
      supDate: supDate === '' ? 'Date is required' : '',
      supAddress: supAddress === '' ? 'Address is required' : '',
      supPhone: supPhone === '' ? 'Phone No is required' : ''
    };

    setState({ ...state, errors });
    return !Object.values(errors).some(error => error !== '');
  };

  const saveOrUpdateSupplier = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const supplier = {
        supName: state.supName,
        supDate: state.supDate,
        supAddress: state.supAddress,      
        supPhone: state.supPhone
      };
      console.log('supplier => ' + JSON.stringify(supplier));

      SupplierService.createSupplier(supplier).then(() => {
        navigate('/list-supplier');
      });
    }
  };

  const { errors } = state;

  return (
    <div>
      <AdminHeader />
      <br />
      <div className="container">
      <h2 className="text-center">Supplier Details</h2>
        <br></br>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Supplier Name:</label>
                  <input
                   
                    name="supName"
                    className={`form-control ${errors.supName ? 'is-invalid' : ''}`}
                    value={state.supName}
                    onChange={changePackgeNameHandler}
                  />
                  <div className="invalid-feedback">{errors.supName}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="supDate"
                    className={`form-control ${errors.supDate ? 'is-invalid' : ''}`}
                    value={state.supDate}
                    onChange={changeDestinationHandler}
                  />
                  <div className="invalid-feedback">{errors.supDate}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Address:</label>
                  <input
                   
                    name="supAddress"
                    className={`form-control ${errors.supAddress ? 'is-invalid' : ''}`}
                    value={state.supAddress}
                    onChange={changePackgeTypeHandler}
                  />
                  <div className="invalid-feedback">{errors.supAddress}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Phone No:</label>
                  <input
                    
                    name="supPhone"
                    className={`form-control ${errors.supPhone ? 'is-invalid' : ''}`}
                    value={state.supPhone}
                    onChange={changeDurationHandler}
                  />
                  <div className="invalid-feedback">{errors.supPhone}</div>
                </div>

                <button className="btn btn-primary" onClick={saveOrUpdateSupplier}>
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

export default CreateSupplierComponent;

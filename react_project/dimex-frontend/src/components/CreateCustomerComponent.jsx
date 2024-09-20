import React, { useState } from 'react';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import SellerHeader from './SellerHeader';

const CreateCustomerComponent = () => {
  const [state, setState] = useState({
    cusName: '',
    cusCategory: '',
    cusDate: new Date().toISOString().slice(0, 10), // Set initial date to today
    cusPhone: '',

    errors: {
      cusName: '',
      cusCategory: '',
      cusDate: '',
      cusPhone: ''
    }
  });
  const navigate = useNavigate();

  const changePackgeNameHandler = (event) => {
    setState({ ...state, cusName: event.target.value });
  };

  const changePackgeTypeHandler = (event) => {
    setState({ ...state, cusCategory: event.target.value });
  };

  const changeDestinationHandler = (event) => {
    setState({ ...state, cusDate: event.target.value });
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
      cusPhone: ''
    };
  
    if (!isValidLength) {
      errors.cusPhone = 'Phone number must be exactly 10 digits';
    } else if (containsLetters) {
      errors.cusPhone = 'Phone number should contain only numbers';
    }
  
    setState({ 
      ...state, 
      cusPhone: formattedPhoneNumber,
      errors: errors
    });
  };

  const validateForm = () => {
    const { cusName, cusCategory, cusDate, cusPhone } = state;
    const errors = {
      cusName: cusName === '' ? 'Customer name is required' : '',
      cusCategory: cusCategory === '' ? 'Category is required' : '',
      cusDate: cusDate === '' ? 'Date is required' : '',
      cusPhone: cusPhone === '' ? 'Phone is required' : ''
    };

    setState({ ...state, errors });
    return !Object.values(errors).some(error => error !== '');
  };

  const saveOrUpdateCustomer = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const customer = {
        cusName: state.cusName,
        cusCategory: state.cusCategory,
        cusDate: state.cusDate,
        cusPhone: state.cusPhone
      };
      console.log('customer => ' + JSON.stringify(customer));

      CustomerService.createCustomer(customer).then(() => {
        navigate('/list-customer');
      });
    }
  };

  const { errors } = state;

  return (
    <div>
      <SellerHeader />
      <br />
      <div className="container">
      <h2 className="text-center">CUSTOMET DETAILS</h2>
        <br></br>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Customer Name:</label>
                  <input
                   
                    name="cusName"
                    className={`form-control ${errors.cusName ? 'is-invalid' : ''}`}
                    value={state.cusName}
                    onChange={changePackgeNameHandler}
                  />
                  <div className="invalid-feedback">{errors.cusName}</div>
                </div>

                <div className="form-group mb-3">
                <label>Gender:</label>
                <select
                  name="cusCategory"
                  className={`form-control ${errors.cusCategory ? 'is-invalid' : ''}`}
                  value={state.cusCategory}
                  onChange={changePackgeTypeHandler}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="invalid-feedback">{errors.cusCategory}</div>
              </div>

                

                <div className="form-group mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="cusDate"
                    className={`form-control ${errors.cusDate ? 'is-invalid' : ''}`}
                    value={state.cusDate}
                    onChange={changeDestinationHandler}
                  />
                  <div className="invalid-feedback">{errors.cusDate}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Phone:</label>
                  <input
                    
                    name="cusPhone"
                    className={`form-control ${errors.cusPhone ? 'is-invalid' : ''}`}
                    value={state.cusPhone}
                    onChange={changeDurationHandler}
                  />
                  <div className="invalid-feedback">{errors.cusPhone}</div>
                </div>

                <button className="btn btn-primary" onClick={saveOrUpdateCustomer}>
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

export default CreateCustomerComponent;

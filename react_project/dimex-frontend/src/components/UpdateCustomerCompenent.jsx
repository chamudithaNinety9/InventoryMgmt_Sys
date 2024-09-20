import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import SellerHeader from './SellerHeader';

const UpdateCustomerComponent = () => {
  const { id } = useParams();
  const [cusName, setcusName] = useState('');
  const [cusCategory, setcusCategory] = useState('');
  const [cusDate, setcusDate] = useState('');
  const [cusPhone, setcusPhone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CustomerService.getCustomerById(id);
        const customer = response.data;

        setcusName(customer.cusName);
        setcusCategory(customer.cusCategory);
        setcusDate(customer.cusDate);
        setcusPhone(customer.cusPhone);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const updateCustomer = async (e) => {
    e.preventDefault();
    const customer = { cusName, cusCategory, cusDate, cusPhone };

    try {
      await CustomerService.updateCustomer(customer, id);
      navigate('/list-customer');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'cusName':
        setcusName(value);
        break;
      case 'cusCategory':
        setcusCategory(value);
        break;
      case 'cusDate':
        setcusDate(value);
        break;
      case 'cusPhone':
        setcusPhone(value);
        break;
      
      default:
        break;
    }
  };

  return (
    <div>
      <SellerHeader />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Customer</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Customer Name:</label>
                  <input
                    
                    name="cusName"
                    className="form-control"
                    value={cusName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                <label>Gender:</label>
                <select
                  name="cusCategory"
                  className="form-control"
                  value={cusCategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

                <div className="form-group mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="cusDate"
                    className="form-control"
                    value={cusDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Phone No:</label>
                  <input
                   
                    name="cusPhone"
                    className="form-control"
                    value={cusPhone}
                    onChange={handleInputChange}
                  />
                </div>

               

                <button className="btn btn-success" onClick={updateCustomer}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/list-customer')}
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

export default UpdateCustomerComponent;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SupplierService from '../services/SupplierService';

const UpdateSupplierComponent = () => {
  const { id } = useParams();
  const [supName, setsupName] = useState('');
  const [supDate, setsupDate] = useState('');
  const [supAddress, setsupAddress] = useState('');
  const [supPhone, setsupPhone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SupplierService.getSupplierById(id);
        const supplier = response.data;

        setsupName(supplier.supName);
        setsupDate(supplier.supDate);
        setsupAddress(supplier.supAddress);
        setsupPhone(supplier.supPhone);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const updateSupplier = async (e) => {
    e.preventDefault();
    const supplier = { supName, supDate, supAddress, supPhone };

    try {
      await SupplierService.updateSupplier(supplier, id);
      navigate('/list-supplier');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'supName':
        setsupName(value);
        break;
      case 'supDate':
        setsupDate(value);
        break;
      case 'supAddress':
        setsupAddress(value);
        break;
      case 'supPhone':
        setsupPhone(value);
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
            <h3 className="text-center">Update Supplier</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Supplier Name:</label>
                  <input
                    
                    name="supName"
                    className="form-control"
                    value={supName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="supDate"
                    className="form-control"
                    value={supDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Address:</label>
                  <input
                   
                    name="supAddress"
                    className="form-control"
                    value={supAddress}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Phone No:</label>
                  <input
                   
                    name="supPhone"
                    className="form-control"
                    value={supPhone}
                    onChange={handleInputChange}
                  />
                </div>

               

                <button className="btn btn-success" onClick={updateSupplier}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/list-supplier')}
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

export default UpdateSupplierComponent;

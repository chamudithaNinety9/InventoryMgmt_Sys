import React, { useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const CreateCategoryComponent = () => {
  const [state, setState] = useState({
    itemCategory: '',
    categoryDate: new Date().toISOString().slice(0, 10), // Set initial date to today

    errors: {
      itemCategory: '',
      categoryDate: ''
     
    }
  });
  const navigate = useNavigate();

  const changeCategoryHandler = (event) => {
    setState({ ...state, itemCategory: event.target.value });
  };

  const changeDateHandler = (event) => {
    setState({ ...state, categoryDate: event.target.value });
  };

  
  
  const validateForm = () => {
    const { itemCategory, categoryDate } = state;
    const errors = {
      itemCategory: itemCategory === '' ? 'Category is required' : '',
      categoryDate: categoryDate === '' ? 'Date is required' : ''
      
    };

    setState({ ...state, errors });
    return !Object.values(errors).some(error => error !== '');
  };

  const saveOrUpdateCategory = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const category = {
        itemCategory: state.itemCategory,
        categoryDate: state.categoryDate  
       
      };
      console.log('category => ' + JSON.stringify(category));

      CategoryService.createCategory(category).then(() => {
        navigate('/list-category');
      });
    }
  };

  const { errors } = state;

  return (
    <div>
       <AdminHeader />
      <br />
      <div className="container">
      <h2 className="text-center">Category Details</h2>
        <br></br>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label>Category:</label>
                  <input
                   
                    name="itemCategory"
                    className={`form-control ${errors.itemCategory ? 'is-invalid' : ''}`}
                    value={state.itemCategory}
                    onChange={changeCategoryHandler}
                  />
                  <div className="invalid-feedback">{errors.itemCategory}</div>
                </div>

                <div className="form-group mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="categoryDate"
                    className={`form-control ${errors.categoryDate ? 'is-invalid' : ''}`}
                    value={state.categoryDate}
                    onChange={changeDateHandler}
                  />
                  <div className="invalid-feedback">{errors.categoryDate}</div>
                </div>


                <button className="btn btn-primary" onClick={saveOrUpdateCategory}>
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

export default CreateCategoryComponent;

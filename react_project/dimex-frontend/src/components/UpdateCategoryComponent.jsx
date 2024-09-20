import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from '../services/CategoryService';

const UpdateCategoryComponent = () => {
  const { id } = useParams();
  const [itemCategory, setitemCategory] = useState('');
  const [categoryDate, setcategoryDate] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryService.getCategoryById(id);
        const category = response.data;

        setitemCategory(category.itemCategory);
        setcategoryDate(category.categoryDate);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const updateCategory = async (e) => {
    e.preventDefault();
    const category = {itemCategory, categoryDate, };

    try {
      await CategoryService.updateCategory(category, id);
      navigate('/list-category');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
     
      case 'itemCategory':
        setitemCategory(value);
        break;
      case 'categoryDate':
        setcategoryDate(value);
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
            <h3 className="text-center">Update Category</h3>
            <div className="card-body">
              <form>
              
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
                  <label>Category Name:</label>
                  <input
                   
                    name="categoryDate"
                    className="form-control"
                    value={categoryDate}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-success" onClick={updateCategory}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/list-category')}
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

export default UpdateCategoryComponent;

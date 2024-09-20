import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListCategoryComponent() {
    const [categorys, setCategorys] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        CategoryService.getCategorys().then((res) => {
            setCategorys(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('Error fetching category data.');
            setLoading(false);
        });
    }, []);

    const editCategorys = (id) => {
        navigate(`/update-category/${id}`);
    };

    const deleteCategory = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this category?");
        if (shouldDelete) {
            CategoryService.deleteCategory(id)
                .then((res) => {
                    setCategorys(categorys.filter((category) => category.id !== id));
                    alert("Category deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting category: " + error.message);
                });
        }
    };

    const addCategory = () => {
        navigate('/add-category');
    };

    const filteredCategorys = categorys.filter(category =>
        category.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();

        // Adding Header
        doc.setFontSize(22);
        doc.text('DIMEX ENTERPRISES', 20, 10);
        doc.setFontSize(16);
        doc.text('Category Information', 20, 20);

        // Adding Table
        doc.autoTable({
            startY: 30,
            head: [['Category', 'Date']],
            body: filteredCategorys.map(category => [
                category.itemCategory,
                category.categoryDate
            ]),
            styles: { fontSize: 12 },
            margin: { bottom: 40 }
        });

        // Save the PDF
        doc.save('category-details.pdf');
    };

    const searchInputStyle = {
        fontSize: '0.8rem',  // Increase font size
        padding: '0.6rem'   // Add padding
    };

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">CATEGORY DETAILS</h1>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Category"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={searchInputStyle} // Apply inline styles
                    />
                </div>
                <div className="col-md-6 text-center">
                    <button style={{ margin: "5px" }} className="btn btn-primary" onClick={generatePDF}>
                        Generate PDF
                    </button>
                    <button style={{ margin: "5px" }} className="btn btn-success" onClick={addCategory}>
                        Add Category
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategorys.map(category => (
                            <tr key={category.id}>
                                <td>{category.itemCategory}</td>
                                <td>{category.categoryDate}</td>
                                <td>
                                    <button onClick={() => editCategorys(category.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteCategory(category.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCategoryComponent;

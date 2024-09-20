import React, { useState, useEffect } from 'react';
import SupplierService from '../services/SupplierService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListSupplierComponent() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        SupplierService.getSuppliers().then((res) => {
            setSuppliers(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('Failed to fetch suppliers');
            setLoading(false);
        });
    }, []);

    const editSupplier = (id) => {
        navigate(`/update-supplier/${id}`);
    };

    const viewSupplier = (id) => {
        navigate(`/view-supplier/${id}`);
    };

    const deleteSupplier = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (shouldDelete) {
            SupplierService.deleteSupplier(id)
                .then((res) => {
                    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
                    alert("Supplier deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting supplier: " + error.message);
                });
        }
    };

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.supPhone.includes(searchQuery) || 
        supplier.supName.toLowerCase().includes(searchQuery.toLowerCase())
    );    

    const addSupplier = () => {
        navigate('/add-supplier');
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text('DIMEX ENTERPRISES', 14, 20);
        doc.setFontSize(16);
        doc.text('Supplier Information', 14, 30);
        
        doc.autoTable({
            startY: 40,
            head: [['Supplier Name', 'Date', 'Address', 'Phone No']],
            body: filteredSuppliers.map(supplier => [
                supplier.supName,
                supplier.supDate,
                supplier.supAddress,
                supplier.supPhone
            ]),
            theme: 'striped'
        });

        doc.save('supplier-details.pdf');
    };

    const searchInputStyle = {
        fontSize: '0.8rem',
        padding: '0.6rem'
    };

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">SUPPLIER DETAILS</h1>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Name or Phone No"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={searchInputStyle}
                    />
                </div>
                <div className="col-md-6 text-center">
                    <button style={{ margin: "5px" }} className="btn btn-primary" onClick={generatePDF}>
                        Generate PDF
                    </button>
                    <button style={{ margin: "5px" }} className="btn btn-success" onClick={addSupplier}>
                        Add Supplier
                    </button>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.supName}</td>
                                <td>{supplier.supDate}</td>
                                <td>{supplier.supAddress}</td>
                                <td>{supplier.supPhone}</td>
                                <td>
                                    <button onClick={() => editSupplier(supplier.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteSupplier(supplier.id)} className="btn btn-danger">Delete</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => viewSupplier(supplier.id)} className="btn btn-info">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListSupplierComponent;

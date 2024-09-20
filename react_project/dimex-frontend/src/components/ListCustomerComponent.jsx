import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SellerHeader from './SellerHeader';

function ListCustomerComponent() {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        CustomerService.getCustomers()
            .then((res) => {
                setCustomers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching customers data.');
                setLoading(false);
            });
    }, []);

    const editCustomer = (id) => {
        navigate(`/update-customer/${id}`);
    };

    const viewCustomer = (id) => {
        navigate(`/view-customer/${id}`);
    };

    const deleteCustomer = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this customer?");
        if (shouldDelete) {
            CustomerService.deleteCustomer(id)
                .then((res) => {
                    setCustomers(customers.filter((customer) => customer.id !== id));
                    alert("Customer deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting customer: " + error.message);
                });
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.cusPhone.includes(searchQuery) ||
        customer.cusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.cusCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text('DIMEX ENTERPRISES', 14, 10);
        doc.setFontSize(16);
        doc.text('Customer Information', 14, 20);

        doc.autoTable({
            startY: 30,
            head: [['Customer Name', 'Category', 'Date', 'Phone']],
            body: filteredCustomers.map(customer => [
                customer.cusName,
                customer.cusCategory,
                customer.cusDate,
                customer.cusPhone
            ]),
            styles: { fontSize: 12 },
            margin: { bottom: 20 }
        });

        doc.save('customer-details.pdf');
    };

    const searchInputStyle = {
        fontSize: '0.8rem',
        padding: '0.6rem'
    };

    return (
        <div>
            <SellerHeader />
            <br />
            <h1 className="text-center">CUSTOMER DETAILS</h1>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Vehicle No, Name or Phone No"
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
                </div>
            </div>

            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Gender</th>
                            <th>Date</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.cusName}</td>
                                <td>{customer.cusCategory}</td>
                                <td>{customer.cusDate}</td>
                                <td>{customer.cusPhone}</td>
                                <td>
                                    <button onClick={() => editCustomer(customer.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteCustomer(customer.id)} className="btn btn-danger">Delete</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => viewCustomer(customer.id)} className="btn btn-info">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCustomerComponent;

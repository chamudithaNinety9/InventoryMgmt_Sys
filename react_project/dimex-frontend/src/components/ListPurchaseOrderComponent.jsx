import React, { useState, useEffect } from 'react';
import PurchaseOrderService from '../services/PurchaseOrderService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListPurchaseOrderComponent() {
    const [purchases, setPurchaseOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        PurchaseOrderService.getPurchaseOrders().then((res) => {
            const purchasesData = res.data;
            setPurchaseOrders(purchasesData);
            setLoading(false);

            // Extract unique supplier names for the dropdown
            const uniqueSuppliers = [...new Set(purchasesData.map(purchase => purchase.supName))];
            setSuppliers(uniqueSuppliers);
        })
        .catch((err) => {
            setError('Failed to fetch items');
            setLoading(false);
        });
    }, []);

    const editPurchaseOrders = (id) => {
        navigate(`/update-purchase/${id}`);
    };

    const viewPurchaseOrders = (id) => {
        navigate(`/view-purchase/${id}`);
    };

    const deletePurchaseOrder = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this purchase order?");
        if (shouldDelete) {
            PurchaseOrderService.deletePurchaseOrder(id)
                .then((res) => {
                    setPurchaseOrders(purchases.filter((purchase) => purchase.id !== id));
                    alert("Purchase Orders deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting purchase: " + error.message);
                });
        }
    };

    const filteredPurchaseOrders = purchases
    .filter(purchase =>
        (purchase.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
        purchase.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.itemCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.supName.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (startDate === '' || new Date(purchase.purchDate) >= new Date(startDate)) &&
        (endDate === '' || new Date(purchase.purchDate) <= new Date(endDate)) &&
        (selectedSupplier === '' || purchase.supName.toLowerCase() === selectedSupplier.toLowerCase())
    )
    .sort((a, b) => new Date(b.purchDate) - new Date(a.purchDate)); // Sort by purchDate in descending order

    const totalPurchaseAmount = filteredPurchaseOrders.reduce((total, purchase) => total + parseFloat(purchase.purchTotal), 0);

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString();

        doc.setFontSize(16);
        doc.text('DIMEX ENTERPRISES', 14, 10);

        doc.setFontSize(12);
        doc.text('Purchase Orders Information', 14, 20);
        doc.text(`Date Range: ${startDate} - ${endDate}`, 14, 30);
        doc.text(`Supplier: ${selectedSupplier}`, 14, 40);

        doc.autoTable({
            startY: 50,
            head: [['Item Code', 'Item Category', 'Item Name', 'Date', 'Unit Price', 'QTY', 'Total', 'Supplier Name']],
            body: filteredPurchaseOrders.map(purchase => [
                purchase.itemCode || '',
                purchase.itemCategory || '',
                purchase.itemName || '',
                purchase.purchDate || '',
                purchase.unitPrice || '',
                purchase.purchQTY || '',
                purchase.purchTotal || '',
                purchase.supName || ''
            ]),
            styles: { fontSize: 10 },
            columnStyles: {
                6: { textColor: 'black' } // Style for 'Total' column
            },
            margin: { bottom: 20 }
        });

        doc.text(`Total Purchase Amount: ${totalPurchaseAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

        doc.save(`purchase-details-${currentDate}.pdf`);
    };

    const searchInputStyle = {
        fontSize: '0.8rem',  // Increase font size
        padding: '0.6rem'   // Add padding
    };

    const dateInputContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '7px', // Space between the input fields
        marginTop: '5px'
    };

    const dateInputStyle = {
        width: '140px', // Adjust width as needed
        padding: '0.1rem'
    };

    const buttonStyle = {
        margin: '0.5rem',
        padding: '0.3rem 1.1rem'
    };

    const supplierInputStyle = {
        fontSize: '0.8rem', // Increase font size
        padding: '0.6rem'   // Add padding
    };

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">PURCHASE ORDER DETAILS</h1>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <input
                        type="text"
                        placeholder="Search by Item Name, Code, Supplier or Category"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={searchInputStyle} // Apply inline styles
                    />
                </div>
                <div className="col-md-2 text-center">
                    <select
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        className="form-control"
                        style={supplierInputStyle}
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier} value={supplier}>{supplier}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <div style={dateInputContainerStyle}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={dateInputStyle}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={dateInputStyle}
                        />
                        <button style={buttonStyle} className="btn btn-primary" onClick={generatePDF}>
                            Download
                        </button>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Item Category</th>
                            <th>Item Name</th>
                            <th>Date</th>
                            <th>Unit Price</th>
                            <th>QTY</th>
                            <th>Total</th>
                            <th>Supplier Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPurchaseOrders.map(purchase => (
                            <tr key={purchase.id}>
                                <td>{purchase.itemCode}</td>
                                <td>{purchase.itemCategory}</td>
                                <td>{purchase.itemName}</td>
                                <td>{purchase.purchDate}</td>
                                <td>{purchase.unitPrice}</td>
                                <td>{purchase.purchQTY}</td>
                                <td>{purchase.purchTotal}</td>
                                <td>{purchase.supName}</td>
                                <td>
                                    <button onClick={() => editPurchaseOrders(purchase.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deletePurchaseOrder(purchase.id)} className="btn btn-danger">Delete</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => viewPurchaseOrders(purchase.id)} className="btn btn-info">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListPurchaseOrderComponent;

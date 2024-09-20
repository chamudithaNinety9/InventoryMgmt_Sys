import React, { useState, useEffect } from 'react';
import CreditPurchaseService from '../services/CreditPurchaseService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListCreditPurchaseComponent() {
    const [creditpurchs, setCreditPurchases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        CreditPurchaseService.getCreditPurchases().then((res) => {
            setCreditPurchases(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('Failed to fetch items');
            setLoading(false);
        });
    }, []);

    const deleteCreditPurchase = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this credit purchase?");
        if (shouldDelete) {
            CreditPurchaseService.deleteCreditPurchase(id)
                .then((res) => {
                    setCreditPurchases(creditpurchs.filter((creditpurch) => creditpurch.id !== id));
                    alert("Credit purchase deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting credit purchase: " + error.message);
                });
        }
    };

    const updateCreditStatus = (id, newStatus) => {
        CreditPurchaseService.updateCreditStatus(id, newStatus)
            .then((res) => {
                setCreditPurchases(creditpurchs.map((creditpurch) => 
                    creditpurch.id === id ? { ...creditpurch, creditStatus: newStatus } : creditpurch
                ));
            })
            .catch((error) => {
                alert("Error updating status: " + error.message);
            });
    };

    const filteredCreditPurchases = creditpurchs
        .filter(creditpurch =>
            (creditpurch.supName.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (startDate === '' || new Date(creditpurch.purchaseDate) >= new Date(startDate)) &&
            (endDate === '' || new Date(creditpurch.purchaseDate) <= new Date(endDate))
        )
        .sort((a, b) => {
            const dateComparison = new Date(b.purchaseDate) - new Date(a.purchaseDate);
            return dateComparison;
        });

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text('DIMEX ENTERPRISES', 14, 10);
        doc.setFontSize(10);
        doc.text('Purchase of Credit Information', 14, 20);
        doc.text(`Date Range: ${startDate} - ${endDate}`, 14, 30);

        doc.autoTable({
            startY: 40,
            head: [['Supplier Name', 'Purchase Date', 'Credit Period', 'Pay Date', 'Amount', 'Status']],
            body: filteredCreditPurchases.map(creditpurch => [
                creditpurch.supName,
                creditpurch.purchaseDate,
                creditpurch.creditPeriod,
                creditpurch.endDate,
                creditpurch.creditAmount,
                creditpurch.creditStatus
            ]),
            styles: { fontSize: 10 },
            margin: { bottom: 20 }
        });

        doc.save('creditpurch-details.pdf');
    };

    const searchInputStyle = {
        fontSize: '0.8rem',
        padding: '0.6rem'
    };

    const addCreditPurchase = () => {
        navigate('/add-credit');
    };

    const dateInputContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '7px',
        marginTop: '5px'
    };

    const dateInputStyle = {
        width: '140px',
        padding: '0.1rem'
    };

    const buttonStyle = {
        margin: '0.4rem',
        padding: '0.4rem 0.9rem'
    };

    const rowStyle = (creditpurch) => ({
        backgroundColor: creditpurch.isUpdated ? '#ffdddd' : 'white' // Red mark for updated rows
    });

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">PURCHASE of CREDIT DETAILS</h1>

            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Supplier Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={searchInputStyle}
                    />
                </div>
                <div className="col-md-6 text-center">
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
                            Generate PDF
                        </button>
                        <button style={buttonStyle} className="btn btn-success" onClick={addCreditPurchase}>
                            Add Credit
                        </button>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Purchase Date</th>
                            <th>Credit Period</th>
                            <th>Pay Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCreditPurchases.map(creditpurch => (
                            <tr key={creditpurch.id} style={rowStyle(creditpurch)}>
                                <td>{creditpurch.supName}</td>
                                <td>{creditpurch.purchaseDate}</td>
                                <td>{creditpurch.creditPeriod}</td>
                                <td>{creditpurch.endDate}</td>
                                <td>{creditpurch.creditAmount}</td>
                                <td>
                                    <select
                                        value={creditpurch.creditStatus}
                                        onChange={(e) => updateCreditStatus(creditpurch.id, e.target.value)}
                                    >
                                        <option value="Not Completed">Not Completed</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                                <td>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteCreditPurchase(creditpurch.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCreditPurchaseComponent;

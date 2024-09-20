import React, { useState, useEffect } from 'react';
import SellingService from '../services/SellingService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListSellingComponent() {
    const [sellings, setSellings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        SellingService.getSellings().then((res) => {
            setSellings(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('Failed to fetch items');
            setLoading(false);
        });
    }, []);

    const editSellings = (id) => {
        navigate(`/update-selling/${id}`);
    };

    const deleteSelling = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this selling?");
        if (shouldDelete) {
            SellingService.deleteSelling(id)
                .then((res) => {
                    setSellings(sellings.filter((selling) => selling.id !== id));
                    alert("Selling deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting selling: " + error.message);
                });
        }
    };

    const filteredSellings = sellings
    .filter(selling =>
        (selling.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selling.itemName.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (startDate === '' || new Date(selling.sellDate) >= new Date(startDate)) &&
        (endDate === '' || new Date(selling.sellDate) <= new Date(endDate))
    )
    .sort((a, b) => {
        const dateComparison = new Date(b.sellDate) - new Date(a.sellDate);
        return dateComparison !== 0 ? dateComparison : new Date(b.sellTime) - new Date(a.sellTime);
    });

    const generatePDF = () => {
        const filteredData = sellings.filter(selling => 
            new Date(selling.sellDate) >= new Date(startDate) && new Date(selling.sellDate) <= new Date(endDate)
        );
    
        const totalSellPrice = filteredData.reduce((total, selling) => total + parseFloat(selling.sellTotal), 0);
        const totalProfit = filteredData.reduce((total, selling) => total + parseFloat(selling.sellProfit), 0);
    
        const doc = new jsPDF();
    
        // Adding Header
        doc.setFontSize(14);
        doc.text('DIMEX ENTERPRISES', 20, 10);
        doc.setFontSize(10);
        doc.text('Sellings Information', 20, 20);
        doc.text(`Date Range: ${startDate} - ${endDate}`, 20, 30);
    
        // Adding Table
        doc.autoTable({
            startY: 40,
            head: [['Item Code', 'Item Name', 'Date', 'Time', 'Sell Price', 'QTY', 'Discount', 'Total', 'Profit']],
            body: filteredData.map(selling => [
                selling.itemCode,
                selling.itemName,
                selling.sellDate,
                selling.sellTime,
                selling.sellPrice,
                selling.itemQty,
                selling.discount,
                parseFloat(selling.sellTotal).toFixed(2),
                parseFloat(selling.sellProfit).toFixed(2)
            ]),
            styles: { fontSize: 8 },
            margin: { bottom: 40 }  // Add bottom margin for space to add totals
        });
    
        // Add totals below the table
        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(10);
        doc.text('Total Sell Price:', 20, finalY + 10);
        doc.text(totalSellPrice.toFixed(2), 100, finalY + 10);
        doc.text('Total Profit:', 20, finalY + 20);
        doc.text(totalProfit.toFixed(2), 100, finalY + 20);
    
        doc.save('selling-details.pdf');
    };    
    

    const searchInputStyle = {
        fontSize: '0.8rem',
        padding: '0.6rem'
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

    const rowStyle = (selling) => ({
        backgroundColor: selling.isUpdated ? '#ffdddd' : 'white' // Red mark for updated rows
    });

    const itemCodeStyle = (selling) => ({
        color: selling.isUpdated ? '#d9534f' : 'black', // Highlight ItemCode in red if updated
        fontWeight: selling.isUpdated ? 'bold' : 'normal'
    });

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">SELLING DETAILS</h1>

            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Item Name or Code"
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
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Sell Price</th>
                            <th>QTY</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th>Profit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSellings.map(selling => (
                            <tr key={selling.id} style={rowStyle(selling)}>
                                <td style={itemCodeStyle(selling)}>{selling.itemCode}</td>
                                <td>{selling.itemName}</td>
                                <td>{selling.sellDate}</td>
                                <td>{selling.sellTime}</td>
                                <td>{selling.sellPrice}</td>
                                <td>{selling.itemQty}</td>
                                <td>{selling.discount}</td>
                                <td>{selling.sellTotal}</td>
                                <td>{selling.sellProfit}</td>
                                <td>
                                    <button onClick={() => editSellings(selling.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteSelling(selling.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListSellingComponent;

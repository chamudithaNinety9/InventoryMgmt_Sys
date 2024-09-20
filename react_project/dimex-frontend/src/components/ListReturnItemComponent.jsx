import React, { useState, useEffect } from 'react';
import ReturnItemService from '../services/ReturnItemService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SellerHeader from './SellerHeader';

function ListReturnItemComponent() {
    const [sellings, setReturnItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ReturnItemService.getReturnItems().then((res) => {
            setReturnItems(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError('Failed to fetch items');
            setLoading(false);
        });
    }, []);

    const deleteReturnItem = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this selling?");
        if (shouldDelete) {
            ReturnItemService.deleteReturnItem(id)
                .then((res) => {
                    setReturnItems(sellings.filter((selling) => selling.id !== id));
                    alert("ReturnItem deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting selling: " + error.message);
                });
        }
    };

    const filteredReturnItems = sellings
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
        const doc = new jsPDF();
        const filteredData = filteredReturnItems;

        const totalSellPrice = filteredData.reduce((total, selling) => total + parseFloat(selling.sellTotal), 0);

        doc.setFontSize(14);
        doc.text('DIMEX ENTERPRISES', 14, 20);
        doc.setFontSize(10);
        doc.text('Return Items Information', 14, 30);
        doc.text(`Date Range: ${startDate} - ${endDate}`, 14, 40);

        doc.autoTable({
            startY: 50,
            head: [['Item Code', 'Item Name', 'Date', 'Time', 'Sell Price', 'QTY', 'Discount', 'Total']],
            body: filteredData.map(selling => [
                selling.itemCode,
                selling.itemName,
                selling.sellDate,
                selling.sellTime,
                selling.sellPrice,
                selling.itemQty,
                selling.discount,
                parseFloat(selling.sellTotal).toFixed(2)
            ]),
            foot: [['', '', '', '', '', '', 'Total:', totalSellPrice.toFixed(2)]],
            theme: 'striped'
        });

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
        backgroundColor: selling.isUpdated ? '#ffdddd' : 'white'
    });

    const itemCodeStyle = (selling) => ({
        color: selling.isUpdated ? '#d9534f' : 'black',
        fontWeight: selling.isUpdated ? 'bold' : 'normal'
    });

    return (
        <div>
            <SellerHeader />
            <br />
            <h1 className="text-center">RETURN ITEMS DETAILS</h1>

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReturnItems.map(selling => (
                            <tr key={selling.id} style={rowStyle(selling)}>
                                <td style={itemCodeStyle(selling)}>{selling.itemCode}</td>
                                <td>{selling.itemName}</td>
                                <td>{selling.sellDate}</td>
                                <td>{selling.sellTime}</td>
                                <td>{selling.sellPrice}</td>
                                <td>{selling.itemQty}</td>
                                <td>{selling.discount}</td>
                                <td>{selling.sellTotal}</td>
                                <td>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteReturnItem(selling.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListReturnItemComponent;

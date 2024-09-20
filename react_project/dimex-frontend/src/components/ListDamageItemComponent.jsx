import React, { useState, useEffect } from 'react';
import DamageItemService from '../services/DamageItemService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListDamageItemComponent() {
    const [sellings, setDamageItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        DamageItemService.getDamageItems()
            .then((res) => {
                setDamageItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch items');
                setLoading(false);
            });
    }, []);

    const deleteDamageItem = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this selling?");
        if (shouldDelete) {
            DamageItemService.deleteDamageItem(id)
                .then((res) => {
                    setDamageItems(sellings.filter((selling) => selling.id !== id));
                    alert("Damage Item deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting selling: " + error.message);
                });
        }
    };

    const filteredDamageItems = sellings
        .filter(selling =>
            (selling.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            selling.itemName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            selling.supName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (startDate === '' || new Date(selling.sellDate) >= new Date(startDate)) &&
            (endDate === '' || new Date(selling.sellDate) <= new Date(endDate))
        )
        .sort((a, b) => {
            const dateComparison = new Date(b.sellDate) - new Date(a.sellDate);
            return dateComparison !== 0 ? dateComparison : new Date(b.sellTime) - new Date(a.sellTime);
        });

    const addDamage = () => {
        navigate('/add-damage');
    };

    const generatePDF = () => {
        const filteredData = filteredDamageItems;
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text('DIMEX ENTERPRISES', 14, 10);
        doc.setFontSize(10);
        doc.text(`Damage Items Information`, 14, 20);
        doc.text(`Date Range: ${startDate} - ${endDate}`, 14, 30);

        doc.autoTable({
            startY: 40,
            head: [['Item Code', 'Item Name', 'Date', 'Time', 'Supplier Name', 'QTY']],
            body: filteredData.map(selling => [
                selling.itemCode || '',
                selling.itemName || '',
                selling.sellDate || '',
                selling.sellTime || '',
                selling.supName || '',
                selling.itemQty || ''
            ]),
            styles: { fontSize: 10 },
            margin: { bottom: 20 }
        });

        doc.save('damage-items-details.pdf');
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
            <AdminHeader />
            <br />
            <h1 className="text-center">RETURN ITEMS DETAILS</h1>

            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Supplier Name, Item Name or Code"
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

                        <button style={{ margin: "5px" }} className="btn btn-success" onClick={addDamage}>
                            Add Damage Item
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
                            <th>Supplier Name</th>
                            <th>QTY</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDamageItems.map(selling => (
                            <tr key={selling.id} style={rowStyle(selling)}>
                                <td style={itemCodeStyle(selling)}>{selling.itemCode}</td>
                                <td>{selling.itemName}</td>
                                <td>{selling.sellDate}</td>
                                <td>{selling.sellTime}</td>
                                <td>{selling.supName}</td>
                                <td>{selling.itemQty}</td>
                                <td>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteDamageItem(selling.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListDamageItemComponent;

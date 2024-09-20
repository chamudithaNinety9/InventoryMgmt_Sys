import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from './AdminHeader';

function ListItemComponent() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ItemService.getItems().then((res) => {
            setItems(res.data); 
            setLoading(false);
        })
        .catch((err) => {
            setError('Failed to fetch items');
            setLoading(false);
        });
    }, []);

    const editItems = (id) => {
        navigate(`/update-item/${id}`);
    };

    const viewItems = (id) => {
        navigate(`/view-item/${id}`);
    };

    const deleteItem = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?");
        if (shouldDelete) {
            ItemService.deleteItem(id)
                .then((res) => {
                    setItems(items.filter((item) => item.id !== id));
                    alert("Item deleted successfully.");
                })
                .catch((error) => {
                    alert("Error deleting item: " + error.message);
                });
        }
    };

    const filteredItems = items.filter(item =>
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );    

    const generatePDF = () => {
        const currentDate = new Date().toLocaleDateString();
        const doc = new jsPDF();
    
        doc.setFontSize(22);
        doc.text('DIMEX ENTERPRISES', 14, 10);
    
        doc.setFontSize(16);
        doc.text(`Items Information - ${currentDate}`, 14, 20);
    
        doc.autoTable({
            startY: 30,
            head: [['Item Code', 'Item Category', 'Items Name', 'Marked Price', 'Sell Price', 'QTY']],
            body: filteredItems.map(item => [
                item.itemCode || '',
                item.itemCategory || '',
                item.itemName || '',
                item.markedPrice || '',
                item.sellPrice || '',
                item.itemQty <= 0 ? 'Out of Stock' : item.itemQty
            ]),
            styles: { fontSize: 12 },
            didParseCell: function (data) {
                if (data.column.index === 5 && data.cell.text[0] === 'Out of Stock') {
                    data.cell.styles.textColor = 'red';
                }
            },
            margin: { bottom: 20 }
        });
    
        doc.save(`item-details-${currentDate}.pdf`);
    };
    
    const searchInputStyle = {
        fontSize: '0.8rem',
        padding: '0.6rem'
    };

    return (
        <div>
            <AdminHeader />
            <br />
            <h1 className="text-center">ITEMS DETAILS</h1>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search by Item Name, Code or Category"
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
                            <th>Items Code</th>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Marked Price</th>
                            <th>Sell Price</th>
                            <th>QTY</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.itemCode}</td>
                                    <td>{item.itemCategory}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.markedPrice}</td>
                                    <td>{item.sellPrice}</td>
                                    <td>{item.itemQty <= 0 ? <span style={{ color: 'red' }}>Out of Stock</span> : item.itemQty}</td>
                                    <td>
                                        <button onClick={() => editItems(item.id)} className="btn btn-info">Update</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => deleteItem(item.id)} className="btn btn-danger">Delete</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => viewItems(item.id)} className="btn btn-info">View</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListItemComponent;

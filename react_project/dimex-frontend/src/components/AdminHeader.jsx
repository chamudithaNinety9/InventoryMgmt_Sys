import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/fnlogo.png'; 

class AdminHeader extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#050525', width: '100%' }}>
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Dimex Enterprises" style={{ height: '40px', marginRight: '10px' }} />
                            FEMININE - Admin
                        </Link>
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-supplier" className="nav-link">Add Supplier</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-category" className="nav-link">Add Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-item" className="nav-link">Add Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/list-item" className="nav-link">Manage Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-purchase" className="nav-link">Add Purchase Order</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/list-purchase" className="nav-link">Manage Purchase Order</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Log Out</Link>
                            </li>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default AdminHeader;

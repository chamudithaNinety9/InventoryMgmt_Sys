import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/fnlogo.png'; 

class SellerHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#050525', width: '100%' }}>
                       <div className="container">
                            <Link to="/" className="navbar-brand">
                                <img src={logo} alt="Dimex Enterprises" style={{ height: '40px', marginRight: '10px' }} />
                                FEMININE - Seller
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to="/seller-dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-selling" className="nav-link">Selling Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/seller-selling" className="nav-link">View Selling</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/seller-item" className="nav-link">View Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-return" className="nav-link">Return Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-customer" className="nav-link">Add Customer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-return" className="nav-link">View Return Item</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Log Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default SellerHeader;

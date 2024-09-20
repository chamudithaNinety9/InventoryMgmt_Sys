import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'; 

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#032741' }}>
                        <div className="container">
                            <Link to="/" className="navbar-brand">
                                <img src={logo} alt="Dimex Enterprises" style={{ height: '40px', marginRight: '10px' }} />
                                Dimex Enterprises
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to="/add-supplier" className="nav-link">Supplier</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-supplier" className="nav-link">Supplier View</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-customer" className="nav-link">Customer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-item" className="nav-link">View Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-item" className="nav-link"> Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-purchase" className="nav-link">View Purchase Order</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-purchase" className="nav-link"> Purchase Order</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-category" className="nav-link">View Category</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-category" className="nav-link">Category</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/list-selling" className="nav-link">View Selling</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-selling" className="nav-link">Selling</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
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

export default HeaderComponent;

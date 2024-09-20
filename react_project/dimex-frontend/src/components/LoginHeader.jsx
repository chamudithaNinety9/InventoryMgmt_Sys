import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/fnlogo.png'; 

class LoginHeader extends Component {
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
                                FEMININE
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">
                                    <i className="fas fa-map-marker-alt"></i> Negombo Road, Uhumeeya, Kurunegala
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">
                                    <i className="fas fa-phone-alt"></i> 076 2500673
                                </span>
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

export default LoginHeader;

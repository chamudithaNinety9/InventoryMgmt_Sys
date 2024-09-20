import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer fixed-bottom py-3" style={{ backgroundColor: '#076A74', color: '#FFFFFF', textAlign: 'center', width: '100%' }}>
                <span>All Rights Reserved 2024 - Dimex Enterprises</span>
            </footer>
        );
    }
}

export default FooterComponent;

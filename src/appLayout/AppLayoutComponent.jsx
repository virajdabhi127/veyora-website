import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles.css';

function AppLayoutComponent({ children }) {
    return (
        <div className='app-layout'>
            <Header />
            <div className='app-content'>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default AppLayoutComponent;

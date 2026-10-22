import React from 'react';

import SplashScreen from '../SplashScreen';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles.css';

function AppLayoutComponent({ children }) {
    const [hidden, setHidden] = React.useState(
        () => sessionStorage.getItem('splashShown') === 'true',
    );
    return hidden ? (
        <div className='app-layout'>
            <Header />
            <div className='app-content'>{children}</div>
            <Footer />
        </div>
    ) : (
        <SplashScreen hidden={hidden} setHidden={setHidden} />
    );
}

export default AppLayoutComponent;

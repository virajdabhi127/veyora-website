import { Routes, Route } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import EnergyMonitor from './pages/EnergyMonitor';
import Login from './pages/Login';

import { routes } from './utils/routes';
import './App.css';
import AppLayout from './appLayout';
import { Homepage } from './components/Homepage';
import { AboutUs } from './components/AboutUs';

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path={routes.homepage} element={<Homepage />} />
                <Route path={routes.about} element={<AboutUs />} />
                {/* <Route
                    path='/energy-monitor'
                    element={
                        <>
                            <EnergyMonitor />
                        </>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <>
                            <Navbar variant='login' />
                            <Login />
                        </>
                    }
                /> */}
            </Routes>
        </AppLayout>
    );
}

export default App;

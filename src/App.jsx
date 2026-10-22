import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import './App.css';
import { routes } from './utils/routes';
import AppLayout from './appLayout';
import { Homepage } from './components/Homepage';
import { AboutUs } from './components/AboutUs';
import { EnergyMonitor } from './components/EnergyMonitor';

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path={routes.homepage} element={<Homepage />} />
                <Route path={routes.about} element={<AboutUs />} />
                <Route path={routes.energyMonitor} element={<EnergyMonitor />} />
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

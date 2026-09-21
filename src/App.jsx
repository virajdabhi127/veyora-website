import { Routes, Route } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import Navbar from './Navbar'
import Hero from './Hero'
import HomeSections from './HomeSections'
import { Footer } from './Footer'
import About from './pages/About'
import EnergyMonitor from './pages/EnergyMonitor'
import Login from './pages/Login'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SplashScreen/>
              <Navbar/>
              <Hero />
              <HomeSections/>
              <Footer />
            </>
          }
        />
        <Route 
          path="/about" 
          element={
            <>
              <Navbar/>
              <About/>
              <Footer/>
            </>
          }
        />
        <Route 
          path="/energy-monitor" 
          element={
            <>
              <Navbar/>
              <EnergyMonitor/>
              <Footer/>
            </>
          }
        />
        <Route 
          path="/login" 
          element={
            <>
              <Navbar variant="login"/>
              <Login/>
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
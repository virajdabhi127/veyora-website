import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

function Navbar({ variant }) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    useEffect(() => {
        const handleWindowClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false)
            }
        }

        window.addEventListener('click', handleWindowClick)

        return () => {
            window.removeEventListener('click', handleWindowClick)
        }
    }, [])
    return (
        <div id="head_1">
            <nav id="nav_1" className={scrolled ? 'scrolled' : ''}>
                <Link to="/" className="logo">
                <img src="/images/Veyora.png" alt="Veyora Logo" />
                <span className="logo_text">Veyora</span>
                </Link>
                <div className={`link_1 ${menuOpen ? 'open' : ''}`}>
                    {variant === 'login' ? (
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                            HOME
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                HOME
                            </NavLink>
                            <div ref={dropdownRef} className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                                <a href="#" className="dropdown-trigger" onClick={(e) => { e.preventDefault(), setDropdownOpen(!dropdownOpen)}}>
                                    PRODUCTS
                                </a>
                                <div className="dropdown-content">
                                    <NavLink to="/energy-monitor" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => { setMenuOpen(false), setDropdownOpen(false)}}>
                                        Energy monitoring system
                                    </NavLink>
                                </div>
                            </div>
                            <a href="#contact">CONTACT</a>
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                ABOUT US
                            </NavLink>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                LOGIN
                            </NavLink>
                        </>
                    )}
                </div>
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
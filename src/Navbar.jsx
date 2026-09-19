import { useState, useEffect } from 'react'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
    }, [])
    return (
        <div id="head_1">
            <nav id="nav_1" className={scrolled ? 'scrolled' : ''}>
                <a href="/" className="logo">
                <img src="/images/Veyora.png" alt="Veyora Logo" />
                <span className="logo_text">Veyora</span>
                </a>
                <div className={`link_1 ${menuOpen ? 'open' : ''}`}>
                <a href="/" className="active" onClick={() => setMenuOpen(false)}>HOME</a>
                <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                    <a href="#" className="dropdown-trigger"
                    onClick={(e) => {
                        e.preventDefault()
                        setDropdownOpen(!dropdownOpen)
                    }}
                    >PRODUCTS</a>
                    <div className="dropdown-content">
                    <a href="/energy-monitor">Energy Monitoring System</a>
                    </div>
                </div>
                <a href="#contact">CONTACT</a>
                <a href="/about">ABOUT US</a>
                <a href="/login">LOGIN</a>
                </div>
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
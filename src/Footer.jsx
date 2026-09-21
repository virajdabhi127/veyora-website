import { NavLink, Link } from 'react-router-dom'

function FooterBottom() {
  return (
    <div className="footer_bottom">
      <Link to="/" className="foot_logo">
        <img src="/images/Veyora.png" alt="veyora-logo"/>
        <span className="logo_text">Veyora</span>
      </Link>
      <span className="rights">
        © 2026 Veyora. All Rights Reserved.
      </span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_grid">
        <div className="footer_col">
          <h3>Company</h3>
          <ul>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                  About Veyora
              </NavLink>
            </li>
            <li>
              <NavLink to="/about#our_expertise" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                  Our expertise
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer_col">
          <h3>Products</h3>
          <ul>
            <li>
              <a href="/energy-monitor">Energy Monitoring System</a>
            </li>
          </ul>
        </div>
        <div className="footer_col">
          <h3 id="contact">Contact</h3>
          <ul>
            <li>
              <a href="mailto:virajdabhi910@gmail.com">virajdabhi910@gmail.com</a>
            </li>
            <li>
              <a href="tel:+919409205916">+91 9409205916</a>
            </li>
            <li>Rajkot, Gujarat - 360001</li>
            <li>
              <div className="social_icons">
                <a href="https://www.linkedin.com/company/officialveyora" target="_blank" rel="noopener noreferrer" aria-label="Veyora on LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61594402810196" target="_blank" rel="noopener noreferrer" aria-label="Veyora on Facebook">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/official.veyora" target="_blank" rel="noopener noreferrer" aria-label="Veyora on Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <FooterBottom />
    </footer>
  )
}

export { Footer, FooterBottom }
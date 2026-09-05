import React from 'react'

const Footer = () => {
  return (
   <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              CampusHub
            </a>

            <p>Built by students, for students.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <nav aria-label="Footer navigation">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>

            <p>Email:kelvekarsaish@gmail.com</p>
          </div>
        </div>

        <p className="footer-copyright">
          © 2026 CampusHub. All rights reserved.
        </p>
      </footer>
  )
}

export default Footer

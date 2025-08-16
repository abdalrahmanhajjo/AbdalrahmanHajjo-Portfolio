import React from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Abdalrahman Hajjo</h3>
            <p>Full Stack Developer passionate about creating exceptional digital experiences and innovative solutions.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile Apps</a></li>
              <li><a href="#">UI/UX Design</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Maintenance</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <p>Let's stay connected and collaborate on amazing projects.</p>
            <div className="footer-social">
              <a href="https://github.com/abdalrahmanhajjo" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/abdalrahman-hajjo-176888309" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="mailto:abedhajjo57@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Abdalrahman Hajjo. All rights reserved. Built with ❤️ and modern web technologies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
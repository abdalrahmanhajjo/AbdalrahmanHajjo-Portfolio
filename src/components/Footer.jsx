import React from 'react';
import footer from '../data/footer.json';
import iconMap from '../data/iconMap';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>{footer.name}</h3>
            <p>{footer.tagline}</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              {footer.services.map((service) => (
                <li key={service.label}>
                  <span>{service.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <p>Let's stay connected and collaborate on amazing projects.</p>
            <div className="footer-social">
              {footer.social.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={item.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {footer.name}. All rights reserved. Built with ❤️ and modern web technologies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

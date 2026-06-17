import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import footer from '../data/footer.json';
import iconMap from '../data/iconMap';

const Footer = () => {
  // Smooth-scroll back to the top of the page (the "Top" button).
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand + social */}
          <div className="footer-section footer-brand">
            <h3 className="footer-name">{footer.name}</h3>
            <p className="footer-tagline">{footer.tagline}</p>
            <div className="footer-social">
              {footer.social.map((item) => {
                const Icon = iconMap[item.icon];
                const isMail = item.href.startsWith('mailto');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* In-page navigation anchors */}
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

          {/* Services offered (non-interactive list) */}
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
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {footer.name}. All rights reserved.
            Built with <span className="footer-heart">❤️</span> and modern web technologies.
          </p>
          <button type="button" className="footer-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp /> Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

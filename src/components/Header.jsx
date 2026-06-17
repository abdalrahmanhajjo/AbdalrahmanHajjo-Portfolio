import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // gate the theme icon until hydrated

  useEffect(() => {
    setIsMounted(true);
    // Add the "scrolled" style once the page moves past the top.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open/close the mobile nav and lock body scroll while it's open.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#home" className="logo" onClick={closeMobileMenu}>
          <div className="logo-icon">AH</div>
          <span>Abdalrahman Hajjo</span>
        </a>

        <div className={`nav-backdrop ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>

        {/* Primary navigation — anchors to each in-page section */}
        <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            {['home', 'about', 'skills', 'projects', 'certifications', 'contact'].map((item, index) => (
              <li key={item} style={{ animationDelay: `${index * 0.1}s` }}>
                <a
                  href={`#${item}`}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme switch + mobile menu button */}
        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            disabled={!isMounted}
          >
            {isMounted ? (
              theme === 'dark' ? (
                <FaSun className="sun-icon" />
              ) : (
                <FaMoon className="moon-icon" />
              )
            ) : (
              <div className="theme-icon-placeholder" />
            )}
          </button>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useEffect } from 'react';
import contact from '../data/contact.json';
import iconMap from '../data/iconMap';

const Contact = () => {
  // Reveal each contact method with a staggered fade as it scrolls into view.
  useEffect(() => {
    const contactMethods = document.querySelectorAll('.contact-method');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200); // stagger by position
        }
      });
    }, { threshold: 0.1 });

    contactMethods.forEach(method => observer.observe(method));
    return () => contactMethods.forEach(method => observer.unobserve(method));
  }, []);

  // Render one contact/social entry from the data file.
  const renderMethod = (item) => {
    const Icon = iconMap[item.icon];
    const isExternal = item.href && item.href.startsWith('http');

    const inner = (
      <>
        <div className="contact-icon"><Icon /></div>
        <div className="contact-details">
          <h4>{item.label}</h4>
          <span className="contact-value">{item.value}</span>
        </div>
        {item.href && <span className="contact-arrow" aria-hidden="true">→</span>}
      </>
    );

    // Whole card is the link when an href exists — bigger, clearer click target
    return item.href ? (
      <a
        key={item.label}
        href={item.href}
        className="contact-method contact-method-link"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={`${item.label}: ${item.value}`}
      >
        {inner}
      </a>
    ) : (
      <div key={item.label} className="contact-method">
        {inner}
      </div>
    );
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-content" data-aos="fade-up">
          <h2 className="section-title" style={{ color: 'white' }}>Let's Work Together</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Ready to bring your ideas to life? Get in touch with me directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct contact: email, phone, location */}
          <div className="contact-info" data-aos="fade-right" data-aos-delay="200">
            <h3 style={{ color: 'white', marginBottom: '2rem' }}>Get in Touch</h3>
            <div className="contact-methods">
              {contact.methods.map(renderMethod)}
            </div>
          </div>

          {/* Social profiles: GitHub, LinkedIn, etc. */}
          <div className="contact-info" data-aos="fade-left" data-aos-delay="200">
            <h3 style={{ color: 'white', marginBottom: '2rem' }}>Connect With Me</h3>
            <div className="contact-methods">
              {contact.social.map(renderMethod)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

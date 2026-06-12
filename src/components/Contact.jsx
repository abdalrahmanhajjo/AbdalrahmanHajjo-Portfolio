import React, { useEffect } from 'react';
import contact from '../data/contact.json';
import iconMap from '../data/iconMap';

const Contact = () => {
  useEffect(() => {
    const contactMethods = document.querySelectorAll('.contact-method');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });

    contactMethods.forEach(method => observer.observe(method));
    return () => contactMethods.forEach(method => observer.unobserve(method));
  }, []);

  const renderMethod = (item) => {
    const Icon = iconMap[item.icon];
    return (
      <div key={item.label} className="contact-method">
        <div className="contact-icon"><Icon /></div>
        <div className="contact-details">
          <h4>{item.label}</h4>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.value}
            </a>
          ) : (
            <p style={{ color: 'white' }}>{item.value}</p>
          )}
        </div>
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
          <div className="contact-info" data-aos="fade-right" data-aos-delay="200">
            <h3 style={{ color: 'white', marginBottom: '2rem' }}>Get in Touch</h3>
            <div className="contact-methods">
              {contact.methods.map(renderMethod)}
            </div>
          </div>

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

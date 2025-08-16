import React, { useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn } from 'react-icons/fa';

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

    return () => {
      contactMethods.forEach(method => observer.unobserve(method));
    };
  }, []);

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
              <div className="contact-method">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:abedhajjo57@gmail.com">abedhajjo57@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <a href="tel:+96176536462">+961 76 536 462</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p style={{ color: 'white' }}>Tripoli, Lebanon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-info" data-aos="fade-left" data-aos-delay="200">
            <h3 style={{ color: 'white', marginBottom: '2rem' }}>Connect With Me</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <FaGithub />
                </div>
                <div className="contact-details">
                  <h4>GitHub</h4>
                  <a href="https://github.com/abdalrahmanhajjo" target="_blank" rel="noopener noreferrer">github.com/abdalrahmanhajjo</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <FaLinkedinIn />
                </div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/abdalrahman-hajjo-176888309" target="_blank" rel="noopener noreferrer">linkedin.com/in/abdalrahman-hajjo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const Certifications = () => {
  return (
    <section className="certifications section" id="certifications">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Recognized credentials validating my skills and knowledge
          </p>
        </div>

        <div className="certifications-grid">
          <div className="certification-card hover-lift" data-aos="fade-up" data-aos-delay="100">
            <div className="certification-header">
              <h3 className="certification-title">Meta Certifications</h3>
              <p className="certification-org">Meta (Facebook)</p>
            </div>
            <div className="certification-body">
              <ul className="certification-list">
                <li className="certification-item">
                  <a href="https://coursera.org/verify/RAAEAFPMVHIB" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Introduction to Front-End Development
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/EK15N702H23" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Programming with JavaScript
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/Y5VU7GUNR8L3" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> HTML and CSS in Depth
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/MWQY8Q2GSGKB" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Version Control
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="certification-card hover-lift" data-aos="fade-up" data-aos-delay="200">
            <div className="certification-header">
              <h3 className="certification-title">Microsoft Certifications</h3>
              <p className="certification-org">Microsoft</p>
            </div>
            <div className="certification-body">
              <ul className="certification-list">
                <li className="certification-item">
                  <a href="https://coursera.org/verify/specialization/ZUFE1PARK2IQ" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Microsoft 365 Fundamentals (Specialization)
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/GMESU21RV1KX" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Work Smarter with Microsoft Word
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/B4UTBTO886ML" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Work Smarter with Microsoft Excel
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/KGHI5KKTQYZV" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Work Smarter with Microsoft PowerPoint
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="certification-card hover-lift" data-aos="fade-up" data-aos-delay="300">
            <div className="certification-header">
              <h3 className="certification-title">WordPress Certifications</h3>
              <p className="certification-org">WordPress</p>
            </div>
            <div className="certification-body">
              <ul className="certification-list">
                <li className="certification-item">
                  <a href="https://coursera.org/verify/X7DW97GS835M" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Build a Full Website using WordPress
                  </a>
                </li>
                <li className="certification-item">
                  <a href="https://coursera.org/verify/6BM1PW7YPW7J" className="certification-link" target="_blank" rel="noopener noreferrer">
                    <FaCertificate /> Build a Free Website with WordPress
                  </a>
                </li>
                <li className="certification-item">
                  <a href="#" className="certification-link">
                    <FaCertificate /> IC3 Digital Literacy Certification
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
import React from 'react';
import { FaCertificate } from 'react-icons/fa';
import certifications from '../data/certifications.json';

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
          {certifications.map((group) => (
            <div
              key={group.title}
              className="certification-card hover-lift"
              data-aos="fade-up"
              data-aos-delay={group.aosDelay}
            >
              <div className="certification-header">
                <h3 className="certification-title">{group.title}</h3>
                <p className="certification-org">{group.org}</p>
              </div>
              <div className="certification-body">
                <ul className="certification-list">
                  {group.items.map((item) => (
                    <li key={item.name} className="certification-item">
                      {item.link ? (
                        <a
                          href={item.link}
                          className="certification-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaCertificate /> {item.name}
                        </a>
                      ) : (
                        <span className="certification-link">
                          <FaCertificate /> {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

import React from 'react';
import { FaDownload } from 'react-icons/fa';
import meImage from '../assets/images/me.png';  // Note the ../ to go up one level from components/


const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="about-grid">
          <div className="about-image hover-lift" data-aos="fade-right" data-aos-delay="200">
           <img src={meImage} alt="Profile" />
          </div>

          <div className="about-content" data-aos="fade-left" data-aos-delay="200">
            <h2>I'm Abdalrahman Hajjo</h2>
            <br />
            <p>
              A passionate Full Stack Developer based in Tripoli, Lebanon. 
              I specialize in building modern web applications with clean, 
              efficient code and exceptional user experiences.
            </p>
            <br />
            <p>
              Currently in my final year studying Computer Science at Beirut 
              Arab University, I combine academic knowledge with practical 
              experience to deliver high-quality solutions.
            </p>
            <br />
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open-source projects, or sharing knowledge with the developer community.
            </p>

            <div style={{ marginTop: '2rem' }}>
              <a 
                href="https://baudom-my.sharepoint.com/:w:/r/personal/aah276_student_bau_edu_lb/_layouts/15/Doc.aspx?sourcedoc=%7BE3B4C2B4-30EA-4C33-A217-5C51FA9EC461%7D&file=Abdalrahman_Ahmad_Hajjo_CV_Best.docx&action=default&mobileredirect=true" 
                className="btn btn-primary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaDownload /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
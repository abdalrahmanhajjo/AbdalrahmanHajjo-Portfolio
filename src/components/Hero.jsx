import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { FaRocket, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

const Hero = () => {
  useEffect(() => {
    const typed = new Typed('#typed-role', {
      strings: [
        'Full Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Innovator',
        'Creative Coder'
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="hero" id="home">
      {/* Particle background */}
      <div className="particles" id="particles-js"></div>
      
      {/* Gradient overlay */}
      <div className="gradient-overlay"></div>
      
      {/* Floating abstract shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          {/* Availability badge with animation */}
          <div className="hero-badge animate__animated animate__fadeIn">
            <span className="badge-dot"></span>
            <span>Available for freelance work</span>
          </div>
          
          {/* Main title with gradient */}
          <h1 className="hero-title">
            <span className="title-line">Hi, I'm</span>
            <span className="title-line gradient-text">Abdalrahman</span>
            <span className="title-line">
              <span id="typed-role"></span>
              <span className="typing-cursor">|</span>
            </span>
          </h1>
          
          {/* Subtitle with animated underline */}
          <p className="hero-subtitle">
            I craft exceptional digital experiences with modern web technologies, 
            combining <span className="highlight">creativity</span> with <span className="highlight">technical expertise</span> to build impactful solutions.
          </p>
          
          {/* Action buttons with hover effects */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary btn-glow">
              <FaRocket className="btn-icon" />
              <span>View My Work</span>
              <span className="btn-hover-effect"></span>
            </a>
            <a href="#contact" className="btn btn-secondary btn-glow">
              <FaPaperPlane className="btn-icon" />
              <span>Let's Talk</span>
              <span className="btn-hover-effect"></span>
            </a>
          </div>
          
          {/* Social links */}
          <div className="hero-social">
            <span className="social-label">Follow me</span>
            <div className="social-links">
              <a href="https://github.com/abdalrahmanhajjo" aria-label="GitHub" className="social-link">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/abdalrahman-hajjo-176888309/" aria-label="LinkedIn" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-link">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated code snippet with glass morphism effect */}
      <div className="code-preview glass-card">
        <div className="code-header">
          <div className="code-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="code-filename">about-me.js</span>
        </div>
        <div className="code-content">
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '0.5s' }}>
            <span className="code-keyword">const</span> 
            <span className="code-function"> developer</span> = {'{'}
          </div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '0.8s' }}>
            &nbsp;&nbsp;<span className="code-keyword">name</span>: <span className="code-string">'Abdalrahman'</span>,
          </div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '1.1s' }}>
            &nbsp;&nbsp;<span className="code-keyword">skills</span>: [<span className="code-string">'React'</span>, <span className="code-string">'Node.js'</span>, <span className="code-string">'Python'</span>],
          </div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '1.4s' }}>
            &nbsp;&nbsp;<span className="code-keyword">passion</span>: <span className="code-string">'Building amazing things'</span>
          </div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '1.7s' }}>{'}'};</div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '2s' }}>
            <span className="code-comment">// Ready to create something amazing together</span>
          </div>
        </div>
      </div>
      
     
      {/* Decorative sparkles */}
      <div className="sparkles">
        <HiOutlineSparkles className="sparkle sparkle-1" />
        <HiOutlineSparkles className="sparkle sparkle-2" />
        <HiOutlineSparkles className="sparkle sparkle-3" />
      </div>
    </section>
  );
};

export default Hero;
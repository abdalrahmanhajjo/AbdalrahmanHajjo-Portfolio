import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { HiOutlineSparkles } from 'react-icons/hi';
import hero from '../data/hero.json';
import iconMap from '../data/iconMap';

const Hero = () => {
  useEffect(() => {
    const typed = new Typed('#typed-role', {
      strings: hero.roles,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="particles" id="particles-js"></div>
      <div className="gradient-overlay"></div>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge animate__animated animate__fadeIn">
            <span className="badge-dot"></span>
            <span>{hero.badge}</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Hi, I'm</span>
            <span className="title-line gradient-text">{hero.name}</span>
            <span className="title-line">
              <span id="typed-role"></span>
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            I craft exceptional digital experiences with modern web technologies,
            combining <span className="highlight">creativity</span> with{' '}
            <span className="highlight">technical expertise</span> to build impactful solutions.
          </p>

          <div className="hero-actions">
            {hero.buttons.map((btn) => {
              const Icon = iconMap[btn.icon];
              return (
                <a key={btn.label} href={btn.href} className={`btn btn-${btn.variant} btn-glow`}>
                  <Icon className="btn-icon" />
                  <span>{btn.label}</span>
                  <span className="btn-hover-effect"></span>
                </a>
              );
            })}
          </div>

          <div className="hero-social">
            <span className="social-label">Follow me</span>
            <div className="social-links">
              {hero.social.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <a key={item.label} href={item.href} aria-label={item.label} className="social-link">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="code-preview glass-card">
        <div className="code-header">
          <div className="code-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="code-filename">{hero.codePreview.filename}</span>
        </div>
        <div className="code-content">
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: '0.5s' }}>
            <span className="code-keyword">const</span>
            <span className="code-function"> {hero.codePreview.varName}</span> = {'{'}
          </div>
          {hero.codePreview.fields.map((field, i) => (
            <div
              key={field.key}
              className="code-line animate__animated animate__fadeIn"
              style={{ animationDelay: `${0.8 + i * 0.3}s` }}
            >
              &nbsp;&nbsp;<span className="code-keyword">{field.key}</span>:{' '}
              {field.type === 'array' ? (
                <>
                  [{field.value.map((v, j) => (
                    <span key={j}><span className="code-string">'{v}'</span>{j < field.value.length - 1 ? ', ' : ''}</span>
                  ))}]
                </>
              ) : (
                <span className="code-string">'{field.value}'</span>
              )}
              {i < hero.codePreview.fields.length - 1 ? ',' : ''}
            </div>
          ))}
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: `${0.8 + hero.codePreview.fields.length * 0.3}s` }}>{'}'};
          </div>
          <div className="code-line animate__animated animate__fadeIn" style={{ animationDelay: `${0.8 + (hero.codePreview.fields.length + 1) * 0.3}s` }}>
            <span className="code-comment">{hero.codePreview.comment}</span>
          </div>
        </div>
      </div>

      <div className="sparkles">
        <HiOutlineSparkles className="sparkle sparkle-1" />
        <HiOutlineSparkles className="sparkle sparkle-2" />
        <HiOutlineSparkles className="sparkle sparkle-3" />
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import hero from '../data/hero.json';
import iconMap from '../data/iconMap';

// Full cartoon illustration used as the hero centerpiece.
const CHARACTER = `${import.meta.env.BASE_URL}images/character.webp`;

// Framer-motion variants — a soft, staggered entrance for the intro column.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const sectionRef = useRef(null);

  // 3D tilt of the character card, driven by pointer position.
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Rotating job-title animation ("Full Stack Developer" → "UI Engineer"…).
  useEffect(() => {
    const typed = new Typed('#typed-role', {
      strings: hero.roles,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      showCursor: false,
    });
    return () => typed.destroy();
  }, []);

  // Track the pointer to power the spotlight glow + card tilt.
  const handlePointerMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    setTilt({ rx: (0.5 - py) * 6, ry: (px - 0.5) * 9 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      className="hero"
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {/* Decorative background layers */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aurora" aria-hidden="true">
        <span className="aurora-blob blob-a" />
        <span className="aurora-blob blob-b" />
        <span className="aurora-blob blob-c" />
      </div>
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="container hero-layout">
        {/* Left column: intro, CTA buttons, social links */}
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero-badge" variants={item}>
            <span className="badge-dot" />
            <span>{hero.badge}</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={item}>
            <span className="title-line title-greet">Hi, I&apos;m</span>
            <span className="title-line gradient-text">{hero.name}</span>
            <span className="title-line title-role">
              <span id="typed-role" />
              <span className="typing-cursor" aria-hidden="true" />
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={item}>
            I build <span className="highlight">fast, reliable</span> web and mobile apps with{' '}
            React, Node.js, and Flutter, from first sketch to{' '}
            <span className="highlight">production</span>.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            {hero.buttons.map((btn) => {
              const Icon = iconMap[btn.icon];
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`btn btn-${btn.variant} btn-glow`}
                >
                  {Icon && <Icon className="btn-icon" />}
                  <span>{btn.label}</span>
                  <span className="btn-hover-effect" />
                </a>
              );
            })}
          </motion.div>

          <motion.div className="hero-social" variants={item}>
            <span className="social-label">Follow me</span>
            <div className="social-links">
              {hero.social.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: framed cartoon illustration */}
        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="character-scene"
            style={{
              transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
          >
            <div className="character-card">
              <img src={CHARACTER} alt="Cartoon illustration of Abdalrahman working at a laptop" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

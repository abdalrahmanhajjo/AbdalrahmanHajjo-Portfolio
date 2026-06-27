import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import hero from '../data/hero.json';
import iconMap from '../data/iconMap';

// Soft, staggered entrance for the intro stack.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const sectionRef = useRef(null);
  const nameRef = useRef(null); // the giant name; cursor reveals the lime fill over it
  const frame = useRef(0);      // pending rAF id, 0 = none

  // Rotating "Building ___" phrase — whole phrases cross-fade, so the user
  // never sees a half-typed word.
  const [phrase, setPhrase] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setPhrase((i) => (i + 1) % hero.builds.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Pointer drives two things, both written straight to the DOM (no React
  // re-render) and coalesced to one rAF per frame:
  //   --mx/--my : section-relative %, for the ambient lime glow
  //   --nx/--ny : name-relative px, for the spotlight that paints the letters
  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const sec = sectionRef.current;
      if (sec) {
        const r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', `${((clientX - r.left) / r.width) * 100}%`);
        sec.style.setProperty('--my', `${((clientY - r.top) / r.height) * 100}%`);
      }
      const name = nameRef.current;
      if (name) {
        const nr = name.getBoundingClientRect();
        name.style.setProperty('--nx', `${clientX - nr.left}px`);
        name.style.setProperty('--ny', `${clientY - nr.top}px`);
      }
    });
  };

  // Rest the spotlight near the centre of the name when the pointer leaves.
  const resetSpotlight = () => {
    const name = nameRef.current;
    if (name) {
      name.style.setProperty('--nx', '50%');
      name.style.setProperty('--ny', '42%');
    }
  };

  return (
    <section
      className="sr-hero"
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetSpotlight}
    >
      {/* Reactive background: faint dot grid + a lime glow tracking the cursor */}
      <div className="sr-grid" aria-hidden="true" />
      <div className="sr-glow" aria-hidden="true" />

      <m.div
        className="container sr-wrap"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="sr-eyebrow" variants={item}>
          <span className="sr-dot" />
          <span>{hero.badge}</span>
        </m.div>

        {/* The hero device: an outlined name whose letters fill with lime
            under a spotlight that follows the cursor. */}
        <m.h1 className="sr-name" ref={nameRef} variants={item} aria-label="Abdalrahman Hajjo">
          <span className="sr-name-base" aria-hidden="true">Abdalrahman Hajjo</span>
          <span className="sr-name-fill" aria-hidden="true">Abdalrahman Hajjo</span>
        </m.h1>

        <m.div className="sr-tagline" variants={item}>
          <span className="sr-tagline-lead">Full-stack developer in Tripoli, Lebanon.</span>
          <span className="sr-tagline-build">
            Building{' '}
            <span className="sr-build">
              <AnimatePresence mode="wait">
                <m.span
                  key={phrase}
                  className="sr-build-word"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {hero.builds[phrase]}
                </m.span>
              </AnimatePresence>
            </span>
          </span>
        </m.div>

        <m.div className="sr-actions" variants={item}>
          {hero.buttons.map((btn) => {
            const Icon = iconMap[btn.icon];
            return (
              <a key={btn.label} href={btn.href} className={`btn btn-${btn.variant}`}>
                {Icon && <Icon className="btn-icon" />}
                <span>{btn.label}</span>
                <span className="btn-hover-effect" />
              </a>
            );
          })}
        </m.div>

        <m.div className="sr-social" variants={item}>
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
        </m.div>
      </m.div>
    </section>
  );
};

export default Hero;

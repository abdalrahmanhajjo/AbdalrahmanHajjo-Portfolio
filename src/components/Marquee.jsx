import React from 'react';
import { FaAsterisk } from 'react-icons/fa';

// Words that scroll across the kinetic band under the hero.
const WORDS = ['Web Development', 'Mobile Apps', 'React', 'Node.js', 'Flutter', 'UI Engineering'];

// One full set of words; we render it twice so the loop is seamless.
const Track = () => (
  <div className="marquee-track">
    {WORDS.map((word) => (
      <span className="marquee-item" key={word}>
        {word}
        <FaAsterisk className="marquee-sep" aria-hidden="true" />
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <section className="marquee" aria-label="What I build">
    <div className="marquee-row">
      <Track />
      <Track />
    </div>
  </section>
);

export default Marquee;

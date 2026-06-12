import React, { useEffect, useState, useRef } from 'react';
import stats from '../data/stats.json';
import iconMap from '../data/iconMap';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const startTime = performance.now();

      const updateCounters = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        stats.forEach(stat => {
          const el = document.getElementById(stat.id);
          if (el) el.textContent = Math.floor(progress * stat.target) + stat.suffix;
        });

        if (progress < 1) requestAnimationFrame(updateCounters);
      };

      requestAnimationFrame(updateCounters);
    };

    const current = statsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-container">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.id} className={`stat-card ${isVisible ? 'visible' : ''}`}>
              <div className="stat-icon">
                <Icon className="icon" />
              </div>
              <div className="stat-number" id={stat.id}>0+</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;

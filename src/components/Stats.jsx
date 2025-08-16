import React, { useEffect, useState, useRef } from 'react';
import { FiAward, FiClock, FiUsers, FiLayers } from 'react-icons/fi';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      const counters = [
        { element: document.getElementById('projectsCount'), target: 10, suffix: '+' },
        { element: document.getElementById('clientsCount'), target: 10, suffix: '+' },
        { element: document.getElementById('certificationsCount'), target: 9, suffix: '+' },
        { element: document.getElementById('experienceCount'), target: 2, suffix: '+' }
      ];

      const duration = 2000; // Animation duration in ms
      const startTime = performance.now();

      const updateCounters = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        counters.forEach(counter => {
          const value = Math.floor(progress * counter.target);
          counter.element.textContent = value + counter.suffix;
        });

        if (progress < 1) {
          requestAnimationFrame(updateCounters);
        }
      };

      requestAnimationFrame(updateCounters);
    };

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

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-container">
        <div className={`stat-card ${isVisible ? 'visible' : ''}`}>
          <div className="stat-icon">
            <FiLayers className="icon" />
          </div>
          <div className="stat-number" id="projectsCount">0+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        
        <div className={`stat-card ${isVisible ? 'visible' : ''}`}>
          <div className="stat-icon">
            <FiUsers className="icon" />
          </div>
          <div className="stat-number" id="clientsCount">0+</div>
          <div className="stat-label">Satisfied Clients</div>
        </div>
        
        <div className={`stat-card ${isVisible ? 'visible' : ''}`}>
          <div className="stat-icon">
            <FiAward className="icon" />
          </div>
          <div className="stat-number" id="certificationsCount">0+</div>
          <div className="stat-label">Certifications</div>
        </div>
        
        <div className={`stat-card ${isVisible ? 'visible' : ''}`}>
          <div className="stat-icon">
            <FiClock className="icon" />
          </div>
          <div className="stat-number" id="experienceCount">0+</div>
          <div className="stat-label">Years Experience</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
import { useEffect } from 'react';

/**
 * Lightweight AOS-style scroll reveal for any element marked with `data-aos`
 * (e.g. `fade-up`, `fade-right`, `fade-left`). The hidden baseline is opted
 * into from JS via the `aos-ready` class, so if JavaScript never runs the
 * content stays fully visible instead of being stuck at opacity 0.
 *
 * Honors an optional `data-aos-delay` (milliseconds) and respects the user's
 * reduced-motion preference by revealing everything immediately.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-aos]'));
    if (!els.length) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('aos-animate'));
      return;
    }

    // Only now — once we can actually reveal them — hide the elements.
    document.documentElement.classList.add('aos-ready');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = entry.target.getAttribute('data-aos-delay');
          if (delay) entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('aos-animate');
          obs.unobserve(entry.target); // reveal once, then stop watching
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

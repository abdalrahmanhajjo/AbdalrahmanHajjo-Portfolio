import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import useScrollReveal from './hooks/useScrollReveal';
import './App.css';
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  // Bring the data-aos sections (About, Certifications, Contact) to life.
  useScrollReveal();

  useEffect(() => {
    // Dark is the signature theme; honor an explicit saved preference otherwise.
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Brief splash to cover font swap, then get out of the user's way.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  // Drive the theme from the <html> element — the CSS variables live on
  // [data-theme="dark"], which the inline boot script set on <html>. Without
  // this, toggling only changed the inner .app div and nothing switched.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app" data-theme={theme}>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="scroll-progress" id="scrollProgress"></div>
      <div className="grain" aria-hidden="true"></div>

      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
}

export default App;
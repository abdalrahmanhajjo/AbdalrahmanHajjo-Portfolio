import React, { useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';

const Projects = ({ layout = 'grid' }) => { // 'grid' or 'horizontal'
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const projects = [
    {
      id: 1,
      image: "images/2.png",
      title: "SportBootsPro",
      category: "E-Commerce",
      subtitle: "Lebanon's premier sportswear marketplace",
      description: "A comprehensive e-commerce platform featuring secure payments, inventory management, and user-friendly shopping experience.",
      date: "June 2024",
      tech: ["Flask", "MySQL", "JavaScript", "Stripe API", "Bootstrap"],
      liveLink: "https://sportbootspro.42web.io/",
      codeLink: "https://github.com/abdalrahmanhajjo/SportBootsPro"
    },
    {
      id: 2,
      image: "images/3.png",
      title: "Children Album",
      category: "Web App",
      subtitle: "Digital platform for childhood memories",
      description: "A heartwarming platform for families to preserve and organize childhood memories with photo management.",
      date: "May 2024",
      tech: ["PHP", "MySQL", "Tailwind CSS", "TCPDF", "JavaScript"],
      liveLink: "https://children-album.great-site.net/children-album/",
      codeLink: "https://github.com/abdalrahmanhajjo/Children-Album"
    },
    {
      id: 3,
      image: "images/41.png",
      title: "FitSync",
      category: "Mobile App",
      subtitle: "Fitness tracking application",
      description: "A fitness mobile application that helps users track workouts, set goals, and monitor progress.",
      date: "April 2024",
      tech: ["Flutter", "Dart", "Firebase", "UI Design"],
      liveLink: null,
      codeLink: "https://github.com/abdalrahmanhajjo/Fitsync"
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Horizontal scrolling logic
  useEffect(() => {
    if (layout !== 'horizontal') return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!projectsRef.current) return;
      
      const scrollLeft = container.scrollLeft;
      const cardWidth = projectsRef.current.children[0]?.offsetWidth || 400;
      const newIndex = Math.round(scrollLeft / (cardWidth + 32));
      
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [layout]);

  useEffect(() => {
    if (layout !== 'horizontal') return;

    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % projects.length;
        scrollToProject(nextIndex);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [activeIndex, isAutoScrolling, layout]);

  const scrollToProject = (index) => {
    if (!containerRef.current || !projectsRef.current) return;
    
    const container = containerRef.current;
    const card = projectsRef.current.children[index];
    const cardWidth = card.offsetWidth;
    const targetScroll = index * (cardWidth + 32);
    
    const startTime = performance.now();
    const duration = 800;
    const startPos = container.scrollLeft;
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 0.5 * (1 - Math.cos(Math.PI * progress));
      
      container.scrollLeft = startPos + (targetScroll - startPos) * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setActiveIndex(index);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    const newIndex = (activeIndex - 1 + projects.length) % projects.length;
    scrollToProject(newIndex);
    setTimeout(() => setIsAutoScrolling(true), 8000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    const newIndex = (activeIndex + 1) % projects.length;
    scrollToProject(newIndex);
    setTimeout(() => setIsAutoScrolling(true), 8000);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section 
      className={`projects-section ${layout}`} 
      id="projects" 
      ref={containerRef}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              } 
            }
          }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            {layout === 'horizontal' 
              ? "Swipe to explore my recent work" 
              : "A showcase of my recent work and creative solutions"}
          </p>
        </motion.div>

        {layout === 'horizontal' ? (
          <>
            <div className="projects-scroll-container">
              <div className="projects-scroll" ref={projectsRef}>
                {projects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    className={`project-card ${index === activeIndex ? 'active' : ''}`}
                    custom={index}
                    initial="hidden"
                    animate={controls}
                    variants={projectVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="project-image-container">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="project-image" 
                      />
                    </div>
                    
                    <div className="project-content">
                      <div className="project-category">{project.category}</div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-subtitle">{project.subtitle}</p>
                      <p className="project-description">{project.description}</p>
                      
                      <div className="project-meta">
                        <span className="project-date">{project.date}</span>
                        
                        <div className="project-links">
                          <div className="link-group">
                            {project.liveLink ? (
                              <a 
                                href={project.liveLink} 
                                className="project-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <FaExternalLinkAlt /> Live
                              </a>
                            ) : (
                              <span className="project-link disabled">
                                <FaExternalLinkAlt /> Live
                              </span>
                            )}
                            
                            <a 
                              href={project.codeLink} 
                              className="project-link" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <FaGithub /> Code
                            </a>
                          </div>
                          
                          <a 
                            href={project.liveLink || project.codeLink} 
                            className="learn-more"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Learn More <FaArrowRight className="arrow-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="controls">
              <button className="nav-button left" onClick={scrollLeft}>
                <FaChevronLeft />
              </button>
              
              <div className="indicators">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => {
                      setIsAutoScrolling(false);
                      scrollToProject(index);
                      setTimeout(() => setIsAutoScrolling(true), 8000);
                    }}
                  />
                ))}
              </div>
              
              <button className="nav-button right" onClick={scrollRight}>
                <FaChevronRight />
              </button>
              
              <button className="auto-scroll-toggle" onClick={toggleAutoScroll}>
                {isAutoScrolling ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="project-card"
                custom={index}
                initial="hidden"
                animate={controls}
                variants={projectVariants}
                whileHover={{ y: -10 }}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="project-image" 
                  />
                </div>
                
                <div className="project-content">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.liveLink ? (
                      <a 
                        href={project.liveLink} 
                        className="project-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt /> Live Preview
                      </a>
                    ) : (
                      <span className="project-link disabled">
                        <FaExternalLinkAlt /> No Live Demo
                      </span>
                    )}
                    <a 
                      href={project.codeLink} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="view-all-container"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                delay: 0.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              } 
            }
          }}
        >
          <a 
            href="https://github.com/abdalrahmanhajjo" 
            className="btn btn-secondary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub /> View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
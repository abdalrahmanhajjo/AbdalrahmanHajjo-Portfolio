import React, { useRef } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import projects from '../data/projects.json';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const Buttons = ({ project }) => (
    <div className="project-actions">
      {project.liveLink ? (
        <a href={project.liveLink} className="project-btn project-btn-live" target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt /> Live
        </a>
      ) : (
        <span className="project-btn project-btn-live disabled">
          <FaExternalLinkAlt /> No Demo
        </span>
      )}
      <a href={project.codeLink} className="project-btn project-btn-code" target="_blank" rel="noopener noreferrer">
        <FaGithub /> Code
      </a>
    </div>
  );

  const [featured, ...rest] = projects;

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <motion.div className="section-header" {...anim()}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A showcase of my recent work and creative solutions</p>
        </motion.div>

        {/* ── Featured card ── */}
        <motion.div className="project-featured" {...anim(0.1)}>
          <div className="featured-img-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/${featured.image}`}
              alt={featured.title}
              className="featured-img"
              loading="lazy"
            />
          </div>

          <div className="featured-body">
            <div className="featured-top">
              <span className="featured-badge">Featured Project</span>
              <span className="featured-date">{featured.date}</span>
            </div>

            <span className="featured-num" aria-hidden="true">01</span>

            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-subtitle">{featured.subtitle}</p>
            <p className="featured-desc">{featured.description}</p>

            <div className="project-tech featured-tech">
              {featured.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
            </div>

            <Buttons project={featured} />
          </div>
        </motion.div>

        {/* ── Regular grid ── */}
        <div className="projects-grid">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              {...anim(0.15 + i * 0.1)}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
            >
              <div className="project-img-wrap">
                <img
                  src={`${process.env.PUBLIC_URL}/${project.image}`}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                />
                <div className="project-img-overlay" />
                <span className="card-category">{project.category}</span>
                <span className="card-num" aria-hidden="true">0{i + 2}</span>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-sub">{project.subtitle}</p>
                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                </div>

                <Buttons project={project} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="view-all-container" {...anim(0.45)}>
          <a href="https://github.com/abdalrahmanhajjo" className="view-all-btn" target="_blank" rel="noopener noreferrer">
            <FaGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

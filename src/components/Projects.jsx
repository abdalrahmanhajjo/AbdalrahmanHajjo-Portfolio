import React, { useRef, useState, useMemo } from 'react';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { m, useInView } from 'framer-motion';
import projects from '../data/projects.json';
import iconMap from '../data/iconMap';

// Icons for the technologies that have one (text-only chip otherwise).
const TECH_ICONS = {
  'React.js': 'FaReact',
  JavaScript: 'SiJavascript',
  'Node.js': 'FaNodeJs',
  'Express.js': 'SiExpress',
  MongoDB: 'SiMongodb',
};

// Chip list = technologies that actually group projects (used in 2+),
// ordered by how common they are. The long tail stays reachable via search.
const TECH_CHIPS = (() => {
  const counts = new Map();
  projects.forEach((p) => p.tech.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  const techs = [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);
  return ['All', ...techs];
})();

// Precompute one lowercase haystack per project for instant text search.
const INDEX = projects.map((p) =>
  [p.title, p.subtitle, p.category, p.description, ...p.tech].join(' ').toLowerCase()
);

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

const ProjectCard = ({ project, num }) => (
  <div className="project-card">
    <div className="project-img-wrap">
      <img
        src={`${import.meta.env.BASE_URL}${project.image}`}
        alt={project.title}
        className="project-img"
        loading="lazy"
                decoding="async"
      />
      <div className="project-img-overlay" />
      <span className="card-category">{project.category}</span>
      {num && <span className="card-num" aria-hidden="true">{num}</span>}
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
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState('All');
  const [showFilters, setShowFilters] = useState(false); // mobile chip panel

  const pickTech = (t) => {
    setActiveTech(t);
    setShowFilters(false); // collapse the panel on mobile after choosing
  };

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const q = query.trim().toLowerCase();
  const isDefault = activeTech === 'All' && !q;

  // One pass: match the chosen technology AND the search text.
  const filtered = useMemo(
    () => projects.filter((p, i) => {
      const inTech = activeTech === 'All' || p.tech.includes(activeTech);
      const inQuery = !q || INDEX[i].includes(q);
      return inTech && inQuery;
    }),
    [activeTech, q]
  );

  const [featured, ...rest] = filtered;

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <m.div className="section-header" {...anim()}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Recent work across web, mobile, and full-stack platforms</p>
        </m.div>

        {/* ── Search + mobile filter toggle ── */}
        <m.div className="project-search" {...anim(0.06)}>
          <div className="search-row">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search projects, technology, or category…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search projects"
              />
              {query && (
                <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <FaTimes />
                </button>
              )}
            </div>

            <button
              type="button"
              className={`filter-toggle ${showFilters ? 'open' : ''}`}
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              aria-controls="tech-filters"
            >
              <FaFilter />
              <span>Filters</span>
              {activeTech !== 'All' && <span className="filter-toggle-dot" aria-hidden="true" />}
            </button>
          </div>
        </m.div>

        {/* ── Technology chips (collapsible on mobile) ── */}
        <m.div
          id="tech-filters"
          className={`quick-filters ${showFilters ? 'open' : ''}`}
          role="tablist"
          aria-label="Filter by technology"
          {...anim(0.1)}
        >
          {TECH_CHIPS.map((t) => {
            const Icon = TECH_ICONS[t] ? iconMap[TECH_ICONS[t]] : null;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={activeTech === t}
                className={`quick-chip ${activeTech === t ? 'active' : ''}`}
                onClick={() => pickTech(t)}
              >
                {Icon && <Icon className="quick-chip-icon" />}
                {t}
              </button>
            );
          })}
        </m.div>

        {/* ── Result count ── */}
        <m.p className="search-meta" {...anim(0.14)}>
          <strong>{filtered.length}</strong> of {projects.length} project{projects.length !== 1 ? 's' : ''}
          {!isDefault ? ' match your filter' : ''}
        </m.p>

        {filtered.length === 0 ? (
          <p className="projects-empty">No projects match your filter.</p>
        ) : isDefault ? (
          <>
            {/* ── Featured card ── */}
            <m.div className="project-featured" {...anim(0.18)}>
              <div className="featured-img-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}${featured.image}`}
                  alt={featured.title}
                  className="featured-img"
                  loading="lazy"
                decoding="async"
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
            </m.div>

            {/* ── Regular grid ── */}
            <div className="projects-grid">
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} num={`0${i + 2}`} />
              ))}
            </div>
          </>
        ) : (
          /* ── Filtered grid — one cheap fade keyed to the active filter ── */
          <m.div
            key={`${activeTech}-${q}`}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} num={`0${i + 1}`} />
            ))}
          </m.div>
        )}

        <m.div className="view-all-container" {...anim(0.3)}>
          <a href="https://github.com/abdalrahmanhajjo" className="view-all-btn" target="_blank" rel="noopener noreferrer">
            <FaGithub /> View All on GitHub
          </a>
        </m.div>
      </div>
    </section>
  );
};

export default Projects;

import React, { useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import projects from '../data/projects.json';
import iconMap from '../data/iconMap';

const TECH_ICONS = { // Icons used only for filter chips that have a matching icon.
  'React.js': 'FaReact', // React.js filter chip uses the React icon.
  JavaScript: 'SiJavascript', // JavaScript filter chip uses the JavaScript icon.
  'Node.js': 'FaNodeJs', // Node.js filter chip uses the Node icon.
  'Express.js': 'SiExpress', // Express.js filter chip uses the Express icon.
  MongoDB: 'SiMongodb', // MongoDB filter chip uses the MongoDB icon.
};

const techCounts = projects // Start with all projects to count their technologies.
  .flatMap(({ tech }) => tech) // Collect every project's tech array into one big list.
  .reduce((counts, tech) => { // Convert the tech list into counts like { React: 3 }.
    counts[tech] = (counts[tech] || 0) + 1; // Add 1 each time this technology appears.
    return counts; // Return the updated counts object for the next loop.
  }, {}); // Start counting from an empty object.

const TECH_CHIPS = [ // This becomes the list of technology filter buttons.
  'All', // Always include a button that shows every project.
  ...Object.entries(techCounts) // Turn counts object into pairs like ['React.js', 3].
    .filter(([, count]) => count >= 2) // Only show tech used in 2 or more projects.
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])) // Most common first, alphabetically if tied.
    .map(([tech]) => tech), // Keep only the technology name for the chip label.
];

// Assets live in `public/`, which Vite serves from the site root.
const imagePath = (image) => `${import.meta.env.BASE_URL}${image}`;
const searchableText = ({ title, subtitle, category, description, tech }) => // Build the text that search checks.
  [title, subtitle, category, description, ...tech].join(' ').toLowerCase(); // Search across title, text, category, and tech.

const ProjectButtons = ({ project }) => (
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

const TechPills = ({ tech, featured = false }) => (
  <div className={`project-tech${featured ? ' featured-tech' : ''}`}>
    {tech.map((item) => <span key={item} className="tech-pill">{item}</span>)}
  </div>
);

const ProjectCard = ({ project, num }) => (
  <div className="project-card">
    <div className="project-img-wrap">
      <img
        src={imagePath(project.image)}
        alt={project.title}
        className="project-img"
        loading="lazy"
      />
      <div className="project-img-overlay" />
      <span className="card-category">{project.category}</span>
      {num && <span className="card-num" aria-hidden="true">{num}</span>}
    </div>

    <div className="project-body">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-sub">{project.subtitle}</p>
      <p className="project-desc">{project.description}</p>

      <TechPills tech={project.tech} />
      <ProjectButtons project={project} />
    </div>
  </div>
);

const FeaturedProject = ({ project, anim }) => (
  <motion.div className="project-featured" {...anim(0.18)}>
    <div className="featured-img-wrap">
      <img
        src={imagePath(project.image)}
        alt={project.title}
        className="featured-img"
        loading="lazy"
      />
    </div>

    <div className="featured-body">
      <div className="featured-top">
        <span className="featured-badge">Featured Project</span>
        <span className="featured-date">{project.date}</span>
      </div>

      <span className="featured-num" aria-hidden="true">01</span>

      <h3 className="featured-title">{project.title}</h3>
      <p className="featured-subtitle">{project.subtitle}</p>
      <p className="featured-desc">{project.description}</p>

      <TechPills tech={project.tech} featured />
      <ProjectButtons project={project} />
    </div>
  </motion.div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [query, setQuery] = useState(''); // Stores what the user types in the search box.
  const [activeTech, setActiveTech] = useState('All'); // Stores the selected technology filter.
  const [showFilters, setShowFilters] = useState(false); // Opens/closes the mobile filter chips panel.
  const q = query.trim().toLowerCase(); // Cleans the search text so matching is easier.
  const isDefault = activeTech === 'All' && !q; // True when no search and no filter are active.

  const pickTech = (tech) => { // Runs when a technology chip is clicked.
    setActiveTech(tech); // Save the clicked technology as the active filter.
    setShowFilters(false); // Close the mobile filter panel after choosing.
  };

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const filtered = projects.filter((project) => { // Create the visible project list.
    const matchesTech = activeTech === 'All' || project.tech.includes(activeTech); // Match selected tech, unless filter is All.
    const matchesQuery = !q || searchableText(project).includes(q); // Match search text, unless search is empty.
    return matchesTech && matchesQuery; // Keep only projects that match both filter and search.
  });
  const [featured, ...rest] = filtered; // First result is featured; the rest go in the grid.

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <motion.div className="section-header" {...anim()}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A showcase of my recent work and creative solutions</p>
        </motion.div>

        <motion.div className="project-search" {...anim(0.06)}>
          <div className="search-row">
            <div className="search-box">
              {/* Search icon shown inside the input. */}
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search projects, technology, or category…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search projects"
              />
              {/* Show the clear button only when the search box has text. */}
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
              {/* Dot means a technology filter is selected. */}
              {activeTech !== 'All' && <span className="filter-toggle-dot" aria-hidden="true" />}
            </button>
          </div>
        </motion.div>

        <motion.div
          id="tech-filters"
          className={`quick-filters ${showFilters ? 'open' : ''}`}
          role="tablist"
          aria-label="Filter by technology"
          {...anim(0.1)}
        >
          {TECH_CHIPS.map((t) => {
            // Pick an icon for this filter chip if TECH_ICONS has one.
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
        </motion.div>

        <motion.p className="search-meta" {...anim(0.14)}>
          {/* Count updates automatically because it uses the filtered array. */}
          <strong>{filtered.length}</strong> of {projects.length} project{projects.length !== 1 ? 's' : ''}
          {!isDefault ? ' match your filter' : ''}
        </motion.p>

        {filtered.length === 0 ? (
          <p className="projects-empty">No projects match your filter.</p>
        ) : isDefault ? (
          <>
            <FeaturedProject project={featured} anim={anim} />
            <div className="projects-grid">
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} num={`0${i + 2}`} />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            key={`${activeTech}-${q}`}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} num={`0${i + 1}`} />
            ))}
          </motion.div>
        )}

        <motion.div className="view-all-container" {...anim(0.3)}>
          <a href="https://github.com/abdalrahmanhajjo" className="view-all-btn" target="_blank" rel="noopener noreferrer">
            <FaGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

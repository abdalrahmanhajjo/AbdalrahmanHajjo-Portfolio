import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import skillCategories from '../data/skills.json';
import iconMap from '../data/iconMap';

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0); // selected skill category
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const active = skillCategories[activeTab]; // category shown in the panel

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title">Technical Expertise</h2>
        <p className="section-subtitle">
          Technologies I use to craft modern, scalable, and efficient solutions
        </p>
      </motion.div>

      {/* Category tabs (Frontend, Backend, …) */}
      <motion.div
        className="skills-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {skillCategories.map((category, index) => {
          const Icon = iconMap[category.categoryIcon];
          return (
            <button
              key={category.title}
              className={`skills-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              style={{ '--tab-color': category.color }}
            >
              <Icon className="tab-icon" />
              <span>{category.title}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Panel of skill pills for the active category — cross-fades on tab change */}
      <div className="skills-panel-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="skills-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="skills-category-desc">{active.description}</p>
            <div className="skills-grid">
              {active.skills.map((skill, i) => {
                const SkillIcon = iconMap[skill.icon];
                return (
                  <motion.div
                    key={skill.name}
                    className="skill-pill"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    style={{ '--pill-color': active.color }}
                  >
                    <SkillIcon className="pill-icon" />
                    <span>{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;

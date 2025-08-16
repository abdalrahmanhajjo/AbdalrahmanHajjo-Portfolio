import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaLaravel,
  FaTools,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiNextdotjs,
  SiGraphql,
  SiRedis,
  SiJest,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { motion, useAnimation, useInView } from "framer-motion";


const Skills = () => {
  const skillsContainerRef = useRef(null);
  const skillsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const autoScrollInterval = useRef(null);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate on scroll
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Auto-scroll on mobile
  useEffect(() => {
    if (!isMobile) return;

    const container = skillsContainerRef.current;
    const skills = skillsRef.current;
    if (!container || !skills) return;

    const startAutoScroll = () => {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(() => {
        const cardWidth = skills.firstElementChild?.offsetWidth || 300;
        const currentIndex = Math.round(
          container.scrollLeft / (cardWidth + 16)
        );
        let nextIndex = currentIndex + 1;
        if (nextIndex >= skills.children.length) nextIndex = 0;

        container.scrollTo({
          left: nextIndex * (cardWidth + 16),
          behavior: "smooth",
        });
        setActiveCategory(nextIndex);
      }, 4000);
    };

    startAutoScroll();

    return () => clearInterval(autoScrollInterval.current);
  }, [isMobile]);

  // Scroll to a specific category
  const scrollToCategory = (index) => {
    if (!skillsContainerRef.current || !skillsRef.current) return;

    const container = skillsContainerRef.current;
    const card = skillsRef.current.children[index];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    container.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
    setActiveCategory(index);
  };

  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaReact className="category-icon" />,
      description: "Modern frameworks and UI development",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TailwindCSS", icon: <SiTailwindcss /> },
        { name: "Framer Motion", icon: <TbBrandFramerMotion /> },
      ],
      color: "var(--accent-500)",
    },
    {
      title: "Backend",
      icon: <FaNodeJs className="category-icon" />,
      description: "Server-side applications and APIs",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Python", icon: <FaPython /> },
        { name: "Laravel", icon: <FaLaravel /> },
        { name: "GraphQL", icon: <SiGraphql /> },
      ],
      color: "var(--accent-600)",
    },
    {
      title: "Databases",
      icon: <SiPostgresql className="category-icon" />,
      description: "Data storage and management",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Redis", icon: <SiRedis /> },
      ],
      color: "var(--accent-700)",
    },
    {
      title: "DevOps",
      icon: <FaDocker className="category-icon" />,
      description: "Infrastructure and deployment",
      skills: [
        { name: "Docker", icon: <FaDocker /> },
        { name: "AWS", icon: <FaAws /> },
        { name: "Git", icon: <FaGitAlt /> },
      ],
      color: "var(--accent-800)",
    },
    {
      title: "Testing",
      icon: <SiJest className="category-icon" />,
      description: "Quality assurance and validation",
      skills: [
        { name: "Jest", icon: <SiJest /> },
        { name: "Unit Testing", icon: <FaTools /> },
        { name: "E2E Testing", icon: <FaTools /> },
      ],
      color: "var(--accent-900)",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          Technical Expertise
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1 },
            },
          }}
        >
          Technologies I use to craft modern, scalable, and efficient solutions
        </motion.p>
      </div>

      {/* Desktop category buttons */}
      {!isMobile && (
        <div className="category-indicators">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              className={`indicator ${
                activeCategory === index ? "active" : ""
              }`}
              onClick={() => scrollToCategory(index)}
              style={{ "--active-color": category.color }}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable cards */}
      <div className="skills-container" ref={skillsContainerRef}>
        <div className="skills-scroll" ref={skillsRef}>
          {skillCategories.map((category, index) => (
            <motion.div
              className="skill-card"
              key={index}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              style={{ "--card-color": category.color }}
            >
              <div className="skill-header">
                <div className="skill-icon">{category.icon}</div>
                <h3 className="skill-title">{category.title}</h3>
                <p className="skill-description">{category.description}</p>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <motion.span
                    className="skill-tag"
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 12,
                    }}
                  >
                    <span className="skill-tag-icon">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      {isMobile && (
        <div className="mobile-indicators">
          {skillCategories.map((_, index) => (
            <div
              key={index}
              className={`dot ${activeCategory === index ? "active" : ""}`}
              onClick={() => scrollToCategory(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;

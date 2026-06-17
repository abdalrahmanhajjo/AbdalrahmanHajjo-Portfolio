// Lightweight, free, client-side "About me" knowledge base + answer engine.
// No external API: answers are derived from the portfolio's own CV data, so it
// costs nothing, leaks no keys, and stays strictly on-topic (Abdalrahman's CV).
import skills from './skills.json' with { type: 'json' };
import projects from './projects.json' with { type: 'json' };
import certifications from './certifications.json' with { type: 'json' };

export const profile = {
  name: 'Abdalrahman Hajjo',
  title: 'Full Stack Developer',
  location: 'Tripoli, Lebanon',
  education:
    'Final-year Computer Science student at Beirut Arab University (BAU), combining academic knowledge with hands-on project experience.',
  bio: 'Abdalrahman is a passionate Full Stack Developer based in Tripoli, Lebanon. He builds modern web & mobile applications with clean, efficient code and a strong focus on user experience.',
  email: 'abedhajjo57@gmail.com',
  phone: '+961 76 536 462',
  github: 'https://github.com/abdalrahmanhajjo',
  linkedin: 'https://linkedin.com/in/abdalrahman-hajjo-176888309',
  availability: 'Currently available for freelance work and open to new opportunities.',
  cv: 'https://baudom-my.sharepoint.com/:w:/r/personal/aah276_student_bau_edu_lb/_layouts/15/Doc.aspx?sourcedoc=%7BE3B4C2B4-30EA-4C33-A217-5C51FA9EC461%7D&file=Abdalrahman_Ahmad_Hajjo_CV_Best.docx&action=default&mobileredirect=true',
};

export const SUGGESTIONS = [
  'What are his skills?',
  'Show me his projects',
  'What is his experience?',
  'How can I contact him?',
  'Is he available for work?',
];

const allSkillNames = skills.flatMap((c) => c.skills.map((s) => s.name));

const skillsReply = () => {
  const grouped = skills
    .map((c) => `• ${c.title}: ${c.skills.map((s) => s.name).join(', ')}`)
    .join('\n');
  return `Abdalrahman works across the full stack:\n${grouped}`;
};

const projectsReply = () => {
  const list = projects
    .map((p) => `• ${p.title} — ${p.subtitle} (${p.tech.slice(0, 4).join(', ')})`)
    .join('\n');
  return `He has built ${projects.length}+ projects, including:\n${list}\n\nAsk about any one (e.g. "tell me about Visit Tripoli") for details.`;
};

const projectDetail = (p) => {
  const links = [
    p.liveLink ? `Live: ${p.liveLink}` : null,
    p.codeLink ? `Code: ${p.codeLink}` : null,
  ]
    .filter(Boolean)
    .join('  ·  ');
  return `${p.title} (${p.date}) — ${p.subtitle}\n${p.description}\nTech: ${p.tech.join(', ')}${links ? `\n${links}` : ''}`;
};

const certReply = () => {
  const total = certifications.reduce((n, c) => n + c.items.length, 0);
  const orgs = certifications.map((c) => `• ${c.org}: ${c.items.length} certificates`).join('\n');
  return `Abdalrahman holds ${total}+ certifications:\n${orgs}\nThey cover front-end development, JavaScript, version control, Microsoft 365, and WordPress.`;
};

const contactReply = () =>
  `You can reach Abdalrahman here:\n• Email: ${profile.email}\n• Phone: ${profile.phone}\n• Location: ${profile.location}\n• GitHub: ${profile.github}\n• LinkedIn: ${profile.linkedin}`;

// Generic, keyword-scored intents (checked after the specific ones below).
// Single short keys (≤3 chars) match only as whole words; longer keys match as
// a word prefix (so "stud" → studied/studies/student); keys with a space are
// matched as a phrase. This avoids false hits like "hi" inside "his".
const intents = [
  {
    keys: ['hi', 'hey', 'hello', 'salam', 'marhaba', 'greetings', 'good morning', 'good evening'],
    reply: () =>
      `Hi! 👋 I'm Abdalrahman's portfolio assistant. Ask me about his skills, projects, experience, education, certifications, or how to reach him.`,
  },
  {
    keys: ['who is', 'who are', 'yourself', 'himself', 'introduce', 'your bio', 'background', 'about him', 'about you', 'about abd', 'tell me about him', 'tell me about you'],
    reply: () => `${profile.bio}\nHe is a ${profile.title} and ${profile.education}`,
  },
  {
    keys: ['skill', 'tech', 'technolog', 'stack', 'language', 'framework', 'frontend', 'backend', 'database', 'devops', 'good at'],
    reply: skillsReply,
  },
  {
    keys: ['project', 'portfolio', 'built', 'build', 'made', 'app', 'application', 'showcase', 'his work', 'what has he'],
    reply: projectsReply,
  },
  {
    keys: ['experience', 'years', 'how long', 'senior', 'junior', 'expert', 'professional'],
    reply: () =>
      `Abdalrahman has 2+ years of hands-on experience building full-stack web & mobile applications — 10+ projects delivered for 10+ satisfied clients, alongside his Computer Science studies.`,
  },
  {
    keys: ['stud', 'universit', 'degree', 'school', 'college', 'education', 'bau', 'graduat', 'major'],
    reply: () => profile.education,
  },
  {
    keys: ['cert', 'course', 'coursera', 'meta', 'microsoft', 'wordpress', 'qualif', 'diploma'],
    reply: certReply,
  },
  {
    keys: ['contact', 'email', 'mail', 'reach', 'phone', 'call', 'number', 'linkedin', 'github', 'social'],
    reply: contactReply,
  },
  {
    keys: ['where', 'located', 'location', 'based', 'live', 'city', 'country', 'lebanon', 'tripoli'],
    reply: () => `Abdalrahman is based in ${profile.location}.`,
  },
  {
    keys: ['hire', 'avail', 'freelance', 'open to', 'opportunit', 'work with', 'work together', 'collaborat'],
    reply: () => `${profile.availability}\nThe fastest way to start a conversation is email: ${profile.email}.`,
  },
  {
    keys: ['service', 'offer', 'do you do', 'help with', 'consult', 'maintenance'],
    reply: () =>
      `Abdalrahman offers: Web Development, Mobile Apps, UI/UX Design, Consulting, and Maintenance.`,
  },
  {
    keys: ['cv', 'resume', 'download'],
    reply: () => `You can download Abdalrahman's full CV here:\n${profile.cv}`,
  },
  {
    keys: ['thank', 'thx', 'shukran', 'appreciate'],
    reply: () => `You're welcome! 😊 Anything else you'd like to know about Abdalrahman?`,
  },
];

const norm = (s) => s.toLowerCase().trim();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Does keyword `k` occur in query `q` (word-aware, see note above)?
const matches = (q, words, k) => {
  if (k.includes(' ')) return q.includes(k);
  if (k.length <= 3) return words.includes(k);
  return words.some((w) => w.startsWith(k));
};

/**
 * Answer a free-text question using only the CV knowledge above.
 * Returns a plain string (newlines preserved by the UI).
 */
export function askCV(input) {
  const q = norm(input);
  if (!q) return `Ask me anything about Abdalrahman — his skills, projects, experience, or contact details.`;
  const words = q.split(/[^a-z0-9+#.]+/).filter(Boolean);

  // 1) Specific project by name.
  const proj = projects.find((p) => {
    const t = p.title.toLowerCase();
    return q.includes(t) || t.split(' ').every((w) => w.length > 3 && q.includes(w));
  });
  if (proj) return projectDetail(proj);

  // 2) Specific technology ("do you know react?").
  const tech = allSkillNames.find((name) => new RegExp(`\\b${esc(name.toLowerCase())}\\b`).test(q));
  if (tech) {
    const cat = skills.find((c) => c.skills.some((s) => s.name === tech));
    return `Yes — Abdalrahman works with ${tech} (${cat.title}). It's part of his everyday toolkit, used across several of his projects.`;
  }

  // 3) Keyword-scored generic intents.
  let best = null;
  let bestScore = 0;
  for (const it of intents) {
    const score = it.keys.reduce((n, k) => (matches(q, words, k) ? n + 1 : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }
  if (best) return best.reply();

  // 4) Off-topic guard — stay strictly on the CV.
  return `I'm Abdalrahman's portfolio assistant, so I can only answer questions about his CV — his skills, projects, experience, education, certifications, or how to reach him. Try one of those! 🙂`;
}

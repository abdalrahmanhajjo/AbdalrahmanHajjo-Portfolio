import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { askCV, SUGGESTIONS, profile } from '../data/cv';

const greeting = {
  role: 'bot',
  text: `Hi! 👋 I'm ${profile.name.split(' ')[0]}'s assistant. Ask me anything about his CV — skills, projects, experience, or how to reach him.`,
};

const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the conversation scrolled to the newest message.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const respond = (question) => {
    const answer = askCV(question);
    setTyping(true);
    // Simulate the assistant "thinking", then stream the answer in word by word.
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'bot', text: '', full: answer }]);
      streamAnswer(answer);
    }, 450 + Math.min(answer.length * 4, 900));
  };

  // Typewriter reveal for that "AI is writing" feel.
  const streamAnswer = (full) => {
    let i = 0;
    const step = Math.max(1, Math.round(full.length / 90));
    const id = window.setInterval(() => {
      i += step;
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === 'bot' && 'full' in last) {
          copy[copy.length - 1] = { ...last, text: full.slice(0, i) };
        }
        return copy;
      });
      if (i >= full.length) window.clearInterval(id);
    }, 16);
  };

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    respond(q);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Launcher */}
      <m.button
        className="ai-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI assistant' : 'Ask AI about Abdalrahman'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <FiX /> : <HiSparkles />}
        {!open && <span className="ai-fab-pulse" aria-hidden="true" />}
      </m.button>

      <AnimatePresence>
        {open && (
          <m.div
            className="ai-panel"
            role="dialog"
            aria-label="Ask AI about Abdalrahman"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="ai-head">
              <span className="ai-head-avatar"><HiSparkles /></span>
              <div className="ai-head-meta">
                <strong>Ask about Abdalrahman</strong>
                <span className="ai-head-status"><i /> Online · answers from my CV</span>
              </div>
              <button className="ai-close" onClick={() => setOpen(false)} aria-label="Close">
                <FiX />
              </button>
            </header>

            <div className="ai-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="ai-msg ai-msg-bot ai-typing" aria-label="Assistant is typing">
                  <span /><span /><span />
                </div>
              )}

              {messages.length <= 1 && !typing && (
                <div className="ai-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="ai-chip" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ai-input">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about my skills, projects…"
                aria-label="Type your question"
              />
              <button className="ai-send" onClick={() => send()} disabled={!input.trim() || typing} aria-label="Send">
                <FiSend />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;

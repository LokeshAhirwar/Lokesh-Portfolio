'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Briefcase, Users, Layers, Sparkles } from 'lucide-react';
import { getExperiences } from '../../lib/queries';
import { Experience } from '../../lib/types';
import ExperienceCard from '../../components/ExperienceCard';
import styles from './experience.module.css';

const RESUME_URL =
  'https://vyiqqjwaervuwdooalmt.supabase.co/storage/v1/object/sign/portfolio-assets/Lokesh%20Experienced.pdf?token=eyJraWQiOiIxMWJjNWNmMS1kNzBkLTQ1ZjEtODk3MS05ZmMxM2Y3Y2Y3ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tYXNzZXRzL0xva2VzaCBFeHBlcmllbmNlZC5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4MDE2MjQ1LCJleHAiOjE4ODI2MjQyNDV9.yXveaz6btHJlW6VxJuTa32OjgL-aCgJ2qBYAG63vfYc';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'leadership'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences().then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    return exp.category === activeFilter;
  });

  const workCount = experiences.filter((e) => e.category === 'work').length;
  const leadershipCount = experiences.filter((e) => e.category === 'leadership').length;

  return (
    <div className={`container ${styles.pageWrapper}`}>
      {/* ─── Page Header ────────────────────────────────────────── */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>// Career Journey</span>
        <h1 className={styles.title}>
          Work &amp; <span className="gradient-text">Leadership</span>
        </h1>
        <p className={styles.subtitle}>
          My track record in software engineering, Native Android development, 
          SDK integrations, and tech community leadership.
        </p>
      </motion.div>

      {/* ─── Action Bar & Category Filters ──────────────────────── */}
      <div className={styles.actionBar}>
        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <Layers size={14} />
            <span>All Roles</span>
            <span className={styles.filterCount}>{experiences.length}</span>
          </button>

          <button
            className={`${styles.filterBtn} ${activeFilter === 'work' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('work')}
          >
            <Briefcase size={14} />
            <span>Work Experience</span>
            <span className={styles.filterCount}>{workCount}</span>
          </button>

          <button
            className={`${styles.filterBtn} ${activeFilter === 'leadership' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('leadership')}
          >
            <Users size={14} />
            <span>Leadership &amp; Community</span>
            <span className={styles.filterCount}>{leadershipCount}</span>
          </button>
        </div>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-ghost ${styles.resumeBtn}`}
          id="experience-download-resume"
        >
          <Download size={16} />
          <span>Download Resume</span>
        </a>
      </div>

      {/* ─── Timeline ───────────────────────────────────────────── */}
      <div className={styles.timelineContainer}>
        {loading ? (
          <div className={styles.emptyState}>
            <p>Loading experiences...</p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No experiences found for this category.</p>
          </div>
        ) : (
          filteredExperiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))
        )}
      </div>

      {/* ─── Bottom CTA ─────────────────────────────────────────── */}
      <motion.div
        className={styles.bottomCta}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.bottomCtaGlow} />
        <div>
          <h2 className={styles.bottomCtaTitle}>Interested in collaborating?</h2>
          <p className={styles.bottomCtaDesc}>
            Open to Android engineering roles, internships, and freelance development.
          </p>
        </div>
        <div className={styles.bottomCtaActions}>
          <Link href="/contact" className="btn btn-primary" id="experience-contact-btn">
            Get In Touch
            <ArrowRight size={16} />
          </Link>
          <Link href="/projects" className="btn btn-ghost" id="experience-projects-btn">
            View Projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

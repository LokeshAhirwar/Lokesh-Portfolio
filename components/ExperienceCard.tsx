'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Calendar, MapPin, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { Experience } from '../lib/types';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const isLeadership = experience.category === 'leadership' || experience.employment_type?.toLowerCase().includes('leadership');
  
  // Format description items
  const descriptionList: string[] = Array.isArray(experience.description)
    ? experience.description
    : typeof experience.description === 'string'
    ? experience.description.split('\n').filter((s) => s.trim().length > 0)
    : [];

  // Parse tech stack tags
  const tags = experience.tech_stack
    ? experience.tech_stack.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Timeline Node Column */}
      <div className={styles.markerCol}>
        <div className={styles.marker}>
          {isLeadership ? <Users size={20} /> : <Briefcase size={20} />}
        </div>
        <div className={styles.line} />
      </div>

      {/* Experience Details Card */}
      <div className={styles.card}>
        <div className={styles.cardTopGlow} />

        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.roleGroup}>
            <h3 className={styles.role}>{experience.role}</h3>
            <div className={styles.companyRow}>
              {experience.company_url ? (
                <a
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.companyLink}
                >
                  {experience.company}
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span>{experience.company}</span>
              )}
            </div>
          </div>

          <div className={styles.badgeRow}>
            {experience.employment_type && (
              <span
                className={`${styles.typeBadge} ${
                  isLeadership ? styles.typeLeadership : styles.typeWork
                }`}
              >
                {isLeadership ? <Sparkles size={12} /> : null}
                {experience.employment_type}
              </span>
            )}
            <div className={styles.periodBadge}>
              <Calendar size={13} />
              <span>
                {experience.start_date} – {experience.end_date || 'Present'}
              </span>
            </div>
          </div>
        </div>

        {/* Location if provided */}
        {experience.location && (
          <div className={styles.locationRow}>
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
        )}

        {/* Bullet Points */}
        {descriptionList.length > 0 && (
          <ul className={styles.bullets}>
            {descriptionList.map((bullet, i) => (
              <li key={i} className={styles.bulletItem}>
                <CheckCircle2 size={16} className={styles.bulletIcon} />
                <span>{bullet.replace(/^[-•*]\s*/, '')}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack Chips */}
        {tags.length > 0 && (
          <div className={styles.techStack}>
            {tags.map((tag) => (
              <span key={tag} className={styles.techTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

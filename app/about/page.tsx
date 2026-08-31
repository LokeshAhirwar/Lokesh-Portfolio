'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, Award, MapPin, ArrowRight } from 'lucide-react';
import { getSkills, getCertifications, getExperiences } from '../../lib/queries';
import { Skill, Certification, Experience } from '../../lib/types';
import { SkillsGroup } from '../../components/SkillCard';
import CertificationCard from '../../components/CertificationCard';
import ExperienceCard from '../../components/ExperienceCard';
import SectionHeader from '../../components/SectionHeader';
import styles from './about.module.css';

const STATS = [
  { icon: GraduationCap, label: 'CGPA', value: '7.22', sub: 'B.Tech CSE' },
  { icon: Users, label: 'Community', value: 'GDG', sub: 'Android Lead' },
  { icon: Award, label: 'Year', value: '2026', sub: 'Expected Grad.' },
  { icon: MapPin, label: 'Based In', value: 'Bhopal', sub: 'India' },
];

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getSkills().then(setSkills);
    getCertifications().then(setCerts);
    getExperiences().then(setExperiences);
  }, []);

  const expRef = useRef(null);
  const skillsRef = useRef(null);
  const certsRef = useRef(null);
  const expInView = useInView(expRef, { once: true, margin: '-80px' });
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' });
  const certsInView = useInView(certsRef, { once: true, margin: '-80px' });

  return (
    <div>
      {/* ─── Bio ──────────────────────────────────────────────── */}
      <section className={`section ${styles.bioSection}`} id="bio">
        <div className={styles.bioBg} />
        <div className="container">
          <div className={styles.bioGrid}>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className={styles.bioLabel}>About Me</span>
              <h1 className={styles.bioTitle}>
                Building the Future,
                <br />
                <span className="gradient-text">One Line at a Time</span>
              </h1>
              <div className={styles.bioParagraphs}>
                <p>
                  I&apos;m <strong>Lokesh Ahirwar</strong>, a passionate Native Android Developer
                  pursuing B.Tech in Computer Science & Engineering at{' '}
                  <strong>SIST Bhopal</strong> (2022–2026) with a CGPA of 7.22.
                </p>
                <p>
                  As the <strong>GDG Android Lead</strong>, I organize developer meetups,
                  workshops, and hackathons to grow the Android community. I love building
                  clean, performant Android applications using <strong>Kotlin</strong>,{' '}
                  <strong>Jetpack Compose</strong>, <strong>MVVM architecture</strong>, and
                  modern Android development best practices.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m exploring new Android APIs, contributing to
                  open source, and mentoring fellow students in mobile development.
                </p>
              </div>
            </motion.div>

            {/* Stats & Education */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Stats */}
              <div className={styles.statsGrid}>
                {STATS.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className={styles.statValue}>{value}</div>
                      <div className={styles.statLabel}>{label}</div>
                      <div className={styles.statSub}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education card */}
              <div className={styles.eduCard}>
                <div className={styles.eduIcon}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className={styles.eduTitle}>
                    Sagar Institute of Science and Technology
                  </h3>
                  <p className={styles.eduDeg}>
                    B.Tech — Computer Science & Engineering
                  </p>
                  <p className={styles.eduMeta}>2022 – 2026 &nbsp;•&nbsp; CGPA: 7.22</p>
                  <p className={styles.eduMeta}>Bhopal, Madhya Pradesh, India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Experience Section ──────────────────────────────────── */}
      <section className="section" id="experience" ref={expRef}>
        <div className="container">
          <SectionHeader
            label="// Work & Leadership"
            title="Experience"
            subtitle="Industry roles, software engineering, and developer community leadership."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: '860px', margin: '0 auto' }}
          >
            {experiences.length === 0 ? (
              <p className={styles.empty}>Experiences loading or not added yet.</p>
            ) : (
              experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))
            )}

            {experiences.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/experience" className="btn btn-ghost" id="about-all-exp-btn">
                  View Full Career Timeline
                  <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Skills ──────────────────────────────────────────────── */}
      <section className="section" id="skills" ref={skillsRef}>
        <div className="container">
          <SectionHeader
            label="// Tech Stack"
            title="Skills & Technologies"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skills.length === 0 ? (
              <p className={styles.empty}>Skills loading or not added yet.</p>
            ) : (
              <SkillsGroup skills={skills} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Certifications ──────────────────────────────────────── */}
      <section className="section" id="certifications" ref={certsRef}>
        <div className="container">
          <SectionHeader
            label="// Credentials"
            title="Certifications"
            subtitle="Verified learning achievements and professional credentials."
          />
          <motion.div
            className={styles.certsGrid}
            initial={{ opacity: 0, y: 40 }}
            animate={certsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {certs.length === 0 ? (
              <p className={styles.empty}>Certifications loading or not added yet.</p>
            ) : (
              certs.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

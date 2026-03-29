'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimationFrame } from 'framer-motion';
import { Download, ArrowRight, Phone, Mail, ChevronDown } from 'lucide-react';
import { getFeaturedProjects, getSkills, getLatestCertifications } from '../lib/queries';
import { Project, Skill, Certification } from '../lib/types';
import ProjectCard from '../components/ProjectCard';
import { SkillsGroup } from '../components/SkillCard';
import CertificationCard from '../components/CertificationCard';
import SectionHeader from '../components/SectionHeader';
import styles from './page.module.css';


const RESUME_URL =
  'https://vyiqqjwaervuwdooalmt.supabase.co/storage/v1/object/sign/portfolio-assets/Lokesh_Resume.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMWJjNWNmMS1kNzBkLTQ1ZjEtODk3MS05ZmMxM2Y3Y2Y3ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tYXNzZXRzL0xva2VzaF9SZXN1bWUucGRmIiwiaWF0IjoxNzc0NTE2NzYzLCJleHAiOjE4NjkxMjQ3NjN9.VOGzLhENq7aoucZf2i_Kc5jGQmSF7molnoDwaaRSED0';

const TYPEWRITER_TEXTS = [
  'Native Android Developer',
  'Kotlin Enthusiast',
  'Jetpack Compose Dev',
  'GDG Android Lead',
  'Open Source Contributor',
];

function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = TYPEWRITER_TEXTS[idx];
    const speed = deleting ? 40 : 80;

    timeout.current = setTimeout(() => {
      if (!deleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === '') {
          setDeleting(false);
          setIdx((i) => (i + 1) % TYPEWRITER_TEXTS.length);
        }
      }
    }, speed);

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [text, deleting, idx]);

  return (
    <span className={styles.typewriter}>
      {text}
      <span className={styles.cursor} />
    </span>
  );
}

const BADGES = [
  { label: 'Android Dev', emoji: '🤖', offset: 0 },
  { label: '7.1 CGPA',    emoji: '🎓', offset: (2 * Math.PI) / 3 },
  { label: 'GDG Lead',    emoji: '👥', offset: (4 * Math.PI) / 3 },
];

/** Radius of the orbit circle in px (half of avatarWrap width = 170, add ~70px margin) */
const ORBIT_RADIUS = 195;

function OrbitalBadge({
  label,
  emoji,
  angleOffset,
}: {
  label: string;
  emoji: string;
  angleOffset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    // Full revolution every 12 seconds
    const angle = (t / 12000) * 2 * Math.PI + angleOffset;
    const x = Math.cos(angle) * ORBIT_RADIUS;
    const y = Math.sin(angle) * ORBIT_RADIUS;
    ref.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });

  return (
    <div
      ref={ref}
      className={styles.floatBadge}
      style={{ position: 'absolute', top: '50%', left: '50%' }}
    >
      <span>{emoji}</span>
      {label}
    </div>
  );
}

function OrbitalBadges() {
  return (
    <>
      {BADGES.map((b) => (
        <OrbitalBadge
          key={b.label}
          label={b.label}
          emoji={b.emoji}
          angleOffset={b.offset}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    getFeaturedProjects().then(setProjects);
    getSkills().then(setSkills);
    getLatestCertifications().then(setCerts);
  }, []);

  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const certsRef = useRef(null);

  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const certsInView = useInView(certsRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* ─── Hero Section ──────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        {/* Animated background blobs */}
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.grid} />

        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={styles.heroLeft}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={styles.heroBadge}
            >
              <span className={styles.heroBadgeDot} />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <h1 className={styles.heroName}>
              Hi, I&apos;m <br />
              <span className="gradient-text">Lokesh Ahirwar</span>
            </h1>

            {/* Typewriter */}
            <p className={styles.heroRole}>
              <TypewriterText />
            </p>

            {/* Contact info */}
            <div className={styles.heroContact}>
              <a href="tel:+919009850216" className={styles.contactChip} id="hero-phone">
                <Phone size={14} />
                <span>+91 9009850216</span>
              </a>
              <a href="mailto:lokeshahirwar576@gmail.com" className={styles.contactChip} id="hero-email">
                <Mail size={14} />
                <span>lokeshahirwar576@gmail.com</span>
              </a>
            </div>

            {/* CTAs */}
            <div className={styles.heroCtas}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="hero-resume"
              >
                <Download size={17} />
                Download Resume
              </a>
              <Link href="/projects" className="btn btn-ghost" id="hero-projects-btn">
                View Projects
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={styles.heroRight}
          >
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatarRing2} />
              {/* Glow pulses behind avatar */}
              <div className={styles.avatarGlow} />
              <div className={styles.avatarGlow2} />
              <div className={styles.avatar}>
                <img
                  src="https://vyiqqjwaervuwdooalmt.supabase.co/storage/v1/object/sign/portfolio-assets/my%20portfolio%20photo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMWJjNWNmMS1kNzBkLTQ1ZjEtODk3MS05ZmMxM2Y3Y2Y3ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tYXNzZXRzL215IHBvcnRmb2xpbyBwaG90by5qcGVnIiwiaWF0IjoxNzc0NzYxOTM3LCJleHAiOjE4NjkzNjk5Mzd9.nV2jDm81Akjc9E9XwXPLLRuGDUhhVS7-Nt-9UBvQXao"
                  alt="Lokesh Ahirwar"
                  className={styles.avatarImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://api.dicebear.com/8.x/notionists/svg?seed=lokesh&backgroundColor=0A0A0F';
                  }}
                />
                {/* Inner vignette to blend edges with dark bg */}
                <div className={styles.avatarVignette} />
              </div>
              {/* Orbiting badges */}
              <OrbitalBadges />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#projects"
          className={styles.scrollIndicator}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Scroll to projects"
        >
          <ChevronDown size={20} />
        </motion.a>
      </section>

      {/* ─── Featured Projects ──────────────────────────────────── */}
      <section className="section" id="projects" ref={projectsRef}>
        <div className="container">
          <SectionHeader
            label="// What I've Built"
            title="Featured Projects"
            subtitle="A selection of my best Android and software projects, built with modern tools and clean architecture."
          />

          <motion.div
            className="grid-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {projects.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No projects found. Add some in your Supabase dashboard!</p>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </motion.div>

          {projects.length > 0 && (
            <div className={styles.sectionCta}>
              <Link href="/projects" className="btn btn-ghost" id="home-all-projects-btn">
                View All Projects
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── Skills ──────────────────────────────────────────────── */}
      <section className="section" id="skills" ref={skillsRef}>
        <div className="container">
          <SectionHeader
            label="// Tech Arsenal"
            title="Skills & Technologies"
            subtitle="Tools and technologies I use to bring ideas to life."
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skills.length === 0 ? (
              <p className={styles.emptyState}>Skills will appear here once added to Supabase.</p>
            ) : (
              <SkillsGroup skills={skills} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Latest Certifications ───────────────────────────────── */}
      <section className="section" id="certifications" ref={certsRef}>
        <div className="container">
          <SectionHeader
            label="// Credentials"
            title="Latest Certifications"
            subtitle="Verified credentials from leading platforms and organizations."
          />

          <motion.div
            className={styles.certsGrid}
            initial={{ opacity: 0, y: 40 }}
            animate={certsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {certs.length === 0 ? (
              <p className={styles.emptyState}>Certifications will appear once added to Supabase.</p>
            ) : (
              certs.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} compact />
              ))
            )}
          </motion.div>

          {certs.length > 0 && (
            <div className={styles.sectionCta}>
              <Link href="/about#certifications" className="btn btn-ghost" id="home-all-certs-btn">
                View All Certifications
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerGlow} />
            <div className={styles.ctaContent}>
              <h2>Let&apos;s Build Something Great</h2>
              <p>
                Open to internships, collaborations, and freelance Android projects.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btn-primary" id="home-cta-contact">
                  Get In Touch
                  <ArrowRight size={17} />
                </Link>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  id="home-cta-resume"
                >
                  <Download size={17} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

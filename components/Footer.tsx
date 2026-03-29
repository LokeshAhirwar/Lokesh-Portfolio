import Link from 'next/link';
import { Github, Linkedin, Code2, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { href: 'https://github.com/LokeshAhirwar', label: 'GitHub', icon: Github, id: 'footer-github' },
  { href: 'https://www.linkedin.com/in/lokesh-ahirwar-profile/', label: 'LinkedIn', icon: Linkedin, id: 'footer-linkedin' },
  {
    href: 'https://leetcode.com/u/Lokesh-Ahirwar/',
    label: 'LeetCode',
    icon: Code2,
    id: 'footer-leetcode',
  },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className="gradient-text">LA</span>
            <span className={styles.logoDot}>.</span>
          </Link>
          <p className={styles.tagline}>
            Native Android Developer crafting exceptional mobile experiences.
          </p>
          <div className={styles.contact}>
            <a href="tel:+919009850216" className={styles.contactItem}>
              <Phone size={14} />
              <span>+91 9009850216</span>
            </a>
            <a href="mailto:lokeshahirwar576@gmail.com" className={styles.contactItem}>
              <Mail size={14} />
              <span>lokeshahirwar576@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Nav */}
        <div className={styles.column}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.colLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.colLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className={styles.column}>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ href, label, icon: Icon, id }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={label}
              >
                <Icon size={18} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>
              © {new Date().getFullYear()} Lokesh Ahirwar. All rights reserved.
            </p>
            <p className={styles.built}>
              Built with{' '}
              <span className="gradient-text">♥</span>
              {' '}using Next.js + Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Code2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`} ref={menuRef}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoIcon}>
            <Code2 size={18} />
          </span>
          <span className={styles.logoText}>
            <span className="gradient-text">LA</span>
            <span className={styles.logoDot}>.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                id={`nav-${label.toLowerCase()}`}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
              >
                {label}
                {pathname === href && <span className={styles.activeIndicator} />}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className={styles.actions}>
          <button
            id="theme-toggle"
            className={styles.themeBtn}
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/contact" className="btn btn-primary btn-sm" id="nav-cta">
            Hire Me
          </Link>
          <button
            id="mobile-menu-toggle"
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                id={`mobile-nav-${label.toLowerCase()}`}
                className={`${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileDivider} />
        <Link href="/contact" className="btn btn-primary" id="mobile-nav-cta" style={{ width: '100%', justifyContent: 'center' }}>
          Hire Me
        </Link>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

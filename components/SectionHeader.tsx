'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './SectionHeader.module.css';

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = false }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`${styles.wrap} ${centered ? styles.centered : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {label && (
        <span className={styles.label}>{label}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}

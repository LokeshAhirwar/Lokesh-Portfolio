'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/queries';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './projects.module.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <SectionHeader
          label="// Portfolio"
          title="All Projects"
          subtitle="Everything I've built — from Android apps to tools and open-source contributions."
        />

        {loading ? (
          <div className={styles.skeletonGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`skeleton ${styles.skeletonCard}`} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className={styles.empty}>
            <p>No projects found. Add some in your Supabase dashboard!</p>
          </div>
        ) : (
          <motion.div
            className="grid-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

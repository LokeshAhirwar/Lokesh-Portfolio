'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, ZoomIn } from 'lucide-react';
import { Project } from '@/lib/types';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
}

/* ─── Lightbox Modal ──────────────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [visible, setVisible] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280); // wait for fade-out
  }, [onClose]);

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
    },
    [images.length]
  );

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIdx((i) => (i === images.length - 1 ? 0 : i + 1));
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className={`${styles.lightboxBackdrop} ${visible ? styles.lightboxVisible : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        className={styles.lightboxClose}
        onClick={close}
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className={styles.lightboxCounter}>
          {idx + 1} / {images.length}
        </div>
      )}

      {/* Main image area */}
      <div
        className={styles.lightboxContent}
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNavLeft}`}
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className={styles.lightboxImageWrap}>
          <img
            key={idx}
            src={images[idx]}
            alt={`Screenshot ${idx + 1}`}
            className={styles.lightboxImage}
          />
        </div>

        {images.length > 1 && (
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNavRight}`}
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className={styles.lightboxDots} onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.lightboxDot} ${i === idx ? styles.lightboxDotActive : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Project Card ────────────────────────────────────────────────── */
export default function ProjectCard({ project }: Props) {
  const images = [
    project.img_url1,
    project.img_url2,
    project.img_url3,
    project.img_url4,
  ].filter(Boolean) as string[];

  const techArray = project.tech_stack
    ? project.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  const [imgIdx, setImgIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // For smooth height animation on expand
  const descRef = useRef<HTMLDivElement>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      <article className={`${styles.card} card`} id={`project-${project.id}`}>
        {/* ── Image Carousel ──────────────────────────────────── */}
        {images.length > 0 && (
          <div className={styles.imageWrap}>
            <img
              src={images[imgIdx]}
              alt={`${project.title} screenshot ${imgIdx + 1}`}
              className={styles.image}
              loading="lazy"
            />

            {/* Zoom hint overlay — click to open lightbox */}
            <button
              className={styles.zoomHint}
              onClick={() => setLightboxOpen(true)}
              aria-label="View full-size screenshot"
            >
              <ZoomIn size={18} />
              <span>View</span>
            </button>

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
                  onClick={prev}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
                  onClick={next}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className={styles.dots}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                      onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                      aria-label={`Screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Gradient overlay */}
            <div className={styles.imageOverlay} />
          </div>
        )}

        <div className={styles.body}>
          {/* Title */}
          <h3 className={styles.title}>{project.title}</h3>

          {/* Short desc */}
          <p className={styles.shortDesc}>{project.short_desc}</p>

          {/* Tech stack badges */}
          {techArray.length > 0 && (
            <div className={styles.badges}>
              {techArray.map((tech: string) => (
                <span key={tech} className={`badge ${styles.badge}`}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* ── Expandable description ─────────────────────────── */}
          {project.description && (
            <div
              className={`${styles.expandSection} ${expanded ? styles.expanded : ''}`}
              ref={descRef}
            >
              <div className={styles.descriptionInner}>
                <p className={styles.description}>{project.description}</p>
              </div>
            </div>
          )}

          {/* ── Footer: links + expand toggle ─────────────────── */}
          <div className={styles.footer}>
            <div className={styles.links}>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  id={`project-${project.id}-github`}
                >
                  <Github size={15} />
                  GitHub
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  id={`project-${project.id}-demo`}
                >
                  <ExternalLink size={15} />
                  Demo
                </a>
              )}
            </div>

            {project.description && (
              <button
                className={`${styles.expandBtn} ${expanded ? styles.expandBtnActive : ''}`}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                <span>{expanded ? 'Less' : 'More'}</span>
              </button>
            )}
          </div>
        </div>
      </article>

      {/* ── Lightbox Portal ───────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={imgIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

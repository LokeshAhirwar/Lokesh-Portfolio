import { Certification } from '@/lib/types';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import styles from './CertificationCard.module.css';

interface Props {
  cert: Certification;
  compact?: boolean;
}

export default function CertificationCard({ cert, compact = false }: Props) {
  const dateStr = cert.date
    ? new Date(cert.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : null;

  return (
    <article
      className={`${styles.card} ${compact ? styles.compact : ''} card`}
      id={`cert-${cert.id}`}
    >
      {/* Image or icon */}
      <div className={styles.imageWrap}>
        {cert.image_url ? (
          <img
            src={cert.image_url}
            alt={cert.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.iconFallback}>
            <Award size={28} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div>
          <p className={styles.issuer}>{cert.issuer}</p>
          <h3 className={styles.title}>{cert.title}</h3>
        </div>

        <div className={styles.meta}>
          {dateStr && (
            <span className={styles.date}>
              <Calendar size={13} />
              {dateStr}
            </span>
          )}
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credentialLink}
              id={`cert-${cert.id}-credential`}
            >
              <ExternalLink size={13} />
              Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

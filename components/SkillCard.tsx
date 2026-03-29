import { Skill } from '@/lib/types';
import styles from './SkillCard.module.css';

// Category color map
const CATEGORY_COLORS: Record<string, string> = {
  languages: '#3DDC84',
  frameworks: '#00BCD4',
  tools: '#FF9800',
  databases: '#9C27B0',
  design: '#E91E63',
  cloud: '#2196F3',
  android: '#3DDC84',
  backend: '#FF5722',
  other: '#607D8B',
};

function getCategoryColor(category: string) {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (key.includes(k)) return v;
  }
  return '#607D8B';
}

interface Props {
  skill: Skill;
}

export default function SkillCard({ skill }: Props) {
  const color = getCategoryColor(skill.category);

  return (
    <div
      className={styles.card}
      id={`skill-${skill.id}`}
      style={{ '--skill-color': color } as React.CSSProperties}
    >
      {skill.icon ? (
        <span className={styles.icon} dangerouslySetInnerHTML={{ __html: skill.icon }} />
      ) : (
        <span className={styles.iconFallback}>
          {skill.name.substring(0, 2).toUpperCase()}
        </span>
      )}
      <span className={styles.name}>{skill.name}</span>
    </div>
  );
}

export function SkillsGroup({ skills }: { skills: Skill[] }) {
  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className={styles.groupsWrap}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className={styles.group} id={`skill-group-${category.toLowerCase().replace(/\s+/g, '-')}`}>
          <h4 className={styles.groupTitle}>{category}</h4>
          <div className={styles.grid}>
            {items.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

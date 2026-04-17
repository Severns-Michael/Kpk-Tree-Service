import styles from './SkipToContent.module.css';

interface SkipToContentProps {
  targetId?: string;
}

export function SkipToContent({ targetId = 'main-content' }: SkipToContentProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className={styles.skipLink}
      onClick={handleClick}
    >
      Skip to content
    </a>
  );
}

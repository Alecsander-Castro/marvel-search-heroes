// components/HeroCard/HeroCardSkeleton.tsx
import styles from "./HeroCardSkeleton.module.css";

export function HeroCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.name} />
    </div>
  );
}

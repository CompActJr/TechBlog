import styles from './styles.module.css';

export default function CarouselDots({
  slides,
  currentIndex,
  onSelect
}) {

  const activeDot = currentIndex % slides.length;

  return (
    <div className={styles.dots}>

      {
        slides.map((_, i) => (
          <div
            key={i}
            className={
              activeDot === i
                ? styles.dotActive
                : styles.dot
            }
            onClick={() => onSelect(i)}
          />
        ))
      }

    </div>
  );
}
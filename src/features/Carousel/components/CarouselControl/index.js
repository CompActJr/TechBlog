import styles from './styles.module.css';

import arrow from '@site/static/img/proximo.png';

export default function CarouselControls({onPrev, onNext}) {
  return (
    <>
      <button
        onClick={onPrev}
        className={styles.prev}
      >
        <img
          src={arrow}
          alt="Anterior"
          width={32}
          height={32}
          className={styles.arrowLeft}
        />
      </button>

      <button
        onClick={onNext}
        className={styles.next}
      >
        <img
          src={arrow}
          alt="Próximo"
          width={32}
          height={32}
        />
      </button>
    </>
  );
}
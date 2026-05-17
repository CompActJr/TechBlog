import { useEffect, useState } from 'react';
import Slide from '../Slide';
import styles from './styles.module.css';

export default function CarouselTrack({
    slides,
    currentIndex,
    isTransitioning
}) {

    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {

        const updateSlides = () => {
            setSlidesPerView(
                window.innerWidth <= 996 ? 1 : 3
            );
        };

        updateSlides();

        window.addEventListener('resize', updateSlides);

        return () => {
            window.removeEventListener('resize', updateSlides);
        };

    }, []);

    const extendedSlides = [
        ...slides,
        ...slides,
        ...slides
    ];

    return (
        <div className={styles.viewport}>
            <div
                className={styles.track}
                style={{
                    transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
                    transition: isTransitioning
                        ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'none'
                }}
            >

                {
                    extendedSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={styles.slide}
                        >
                            <Slide {...slide} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
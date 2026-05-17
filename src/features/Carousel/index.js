import { FeatureList } from "./data";
import useCarousel from "../../hooks/useCarousel";

import Slide from "./components/Slide";
import CarouselControls from "./components/CarouselControl";
import CarouselTrack from "./components/CarouselTrack";
import CarouselDots from "./components/CarouselDots";

import styles from './styles.module.css';

export default function Carousel() {
  const carousel = useCarousel(FeatureList.length);

  return (
    <section>
      <div className={styles.carousel}>

        <CarouselControls
          onPrev={carousel.prevSlide}
          onNext={carousel.nextSlide}
        />

        <CarouselTrack
          slides={FeatureList}
          {...carousel}
        />
      </div>

      <CarouselDots
        slides={FeatureList}
        currentIndex={carousel.currentIndex}
        onSelect={(i) => {
          carousel.setCurrentIndex(i + FeatureList.length);
        }}
      />
    </section>
  );
}
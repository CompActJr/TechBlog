import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import ButtonLinks from '../ButtonLinks/ButtonLinks';
import { useEffect, useState } from 'react';

const FeatureList = [
  {
    title: 'Front End',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        
      </>
    ),
  },
  {
    title: 'Back End',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        
      </>
    ),
  },
  {
    title: 'Dev Ops',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      
      </>
    ),
  },
  {
    title: 'Ánalise de Dados',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <ButtonLinks link="/docs/intro" title="Veja mais" />
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const [currentIndex, setCurrentIndex] = useState(FeatureList.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedList = [...FeatureList, ...FeatureList, ...FeatureList];

  const nextSlide = ()=> {
    setCurrentIndex(currentIndex + 1);
    setIsTransitioning(true);
  }

  const prevSlide = ()=> {
    setCurrentIndex(currentIndex - 1);
    setIsTransitioning(true);
  }

  useEffect(() => {
    if (currentIndex >= FeatureList.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(FeatureList.length);
      }, 500); // tempo igual ao do CSS transition
    }
    if (currentIndex <= FeatureList.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(FeatureList.length * 2 - 1);
      }, 300);
    }
  }, [currentIndex]);

  const activeDot = currentIndex % FeatureList.length;

  return (
    <section className={styles.features}>
      <div className={styles.carousel}>
        <button onClick={prevSlide} className={styles.prev} >
          Prev
        </button>

        <div className={styles.viewport}>

          <div 
            className={styles.track} 
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >

            {
              extendedList.map((props, idx) => (
              <div key={idx} className={styles.slide}>
                <Feature {...props} />
              </div>
              ))
            }

          </div>

          <div className={styles.dots}>
              {
                FeatureList.map((_, i)=>(
                  <div
                    key={i}
                    className={(activeDot === i) ? styles.dotActive : styles.dot}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(i + FeatureList.length);
                    }}
                  >
                  </div>
                ))
              }
          </div>

        </div>

        <button onClick={nextSlide} className={styles.next}>
          Next
        </button>
      </div>
    </section>
  );
}

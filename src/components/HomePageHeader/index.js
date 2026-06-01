import styles from './styles.module.css';
import dino from '@site/static/img/dino.png';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

export default function HomepageHeader() {
const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={`${styles.container} ${styles.centerColumn}`}>

        <h1 as="h1" className={styles.title}>
          {siteConfig.title}
        </h1>

        <img src={dino} alt='dino' className={styles.image}/>

        <p className={styles.subtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
import styles from './styles.module.css';
import dino from '@site/static/img/dino.png';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

export default function HomepageHeader() {
const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={`${styles.container} ${styles.centerColumn}`}>

        <h1 as="h1" className="hero__title">
          {siteConfig.title}
        </h1>

        <img src={dino} alt='dino' style={{maxWidth: '100px', borderRadius: '8px'}}/>

        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
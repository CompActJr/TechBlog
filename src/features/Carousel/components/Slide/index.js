import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Slide({Svg, title, description}) {
  return (
    <div>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className={styles.info}>
        <p>{description}</p>

        <button>
          <Link className="button button--secondary button--lg" to="docs/intro">
            {title}
          </Link>
        </button>
        
      </div>
    </div>
  );
}
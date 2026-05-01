import Link from '@docusaurus/Link';
import styles from './button.module.css';

export default function ButtonLinks(props) {
    const { link, title } = props;
    return (
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={link}>
            {title}
          </Link>
        </div>
    )
}
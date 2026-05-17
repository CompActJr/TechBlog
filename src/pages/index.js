import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Carousel from '../features/Carousel';
import HomepageHeader from '../components/HomePageHeader';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Blog técnico da compact e junção de trilhas de capacitações guiadas"
    >
      <HomepageHeader />
      <Carousel/>
    </Layout>
  );
}

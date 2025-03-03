import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started with Crypto Tracker
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Documentation for the Crypto Price Tracker application">
      <HomepageHeader />
      <main>
        <div className="container margin-top--xl margin-bottom--xl">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2>Welcome to Crypto Tracker Documentation</h2>
              <p>
                This documentation site provides comprehensive information about the Crypto Price Tracker application,
                including setup instructions, API details, and development guides.
              </p>
              
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/docs/intro">Introduction</Link> - Overview of the project
                </li>
                <li>
                  <Link to="/docs/project-setup">Project Setup</Link> - How to set up and run the application
                </li>
                <li>
                  <Link to="/docs/api-integration">API Integration</Link> - Details about the CoinGecko API integration
                </li>
                <li>
                  <Link to="/docs/state-management">State Management</Link> - How React Query is used for state management
                </li>
                <li>
                  <Link to="/docs/challenges">Challenges & Solutions</Link> - Problems encountered and how they were solved
                </li>
              </ul>
              
              <h3>Project Features</h3>
              <p>
                The Crypto Price Tracker allows users to:
              </p>
              <ul>
                <li>View real-time cryptocurrency prices</li>
                <li>Search for specific cryptocurrencies</li>
                <li>Manually refresh price data</li>
                <li>See price changes over 24 hours</li>
              </ul>
              
              <div className="margin-top--lg">
                <Link
                  className="button button--primary button--lg"
                  to="https://github.com/bariraS/Crypto-Price-Tracker.git">
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
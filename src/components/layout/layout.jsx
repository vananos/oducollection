import React from 'react';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import Social from '../social/social';
import styles from './layout.module.scss';

export default ({ children }) => (
  <div className={styles.container}>
    <Header className={styles.header} />
    <Navbar className={styles.navbar} />
    <main className={styles.main}>
      {children}
    </main>
    <Social className={styles.social} />
  </div>
);

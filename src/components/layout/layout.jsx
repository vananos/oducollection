import React from 'react';
import Header from '../header/header';
import Navbar, { Menu } from '../navbar/navbar';
import Social from '../social/social';
import styles from './layout.module.scss';

export default ({ children, selectedMenuItem = Menu.ABOUT }) => (
  <div className={styles.container}>
    <Header className={styles.header} />
    <Navbar className={styles.navbar} selectedItem={selectedMenuItem} />
    <main className={styles.main}>
      {children}
    </main>
    <Social className={styles.social} />
  </div>
);

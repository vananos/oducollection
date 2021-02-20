import React from 'react';
import { Link } from 'gatsby';
import styles from './navbar.module.scss';

function NavItem({
  href,
  selected,
  children,
}) {
  return (
    <li className={[styles.navItem, selected ? styles.selected : ''].join(' ')}>
      <Link to={href}>{children}</Link>
    </li>
  );
}

function Nav({
  children,
  className = '',
}) {
  return (
    <nav className={`${styles.navbar} ${className}`.trim()}>
      <ul>
        {children}
      </ul>
    </nav>
  );
}

export default ({
  className,
  selectedItem,
}) => (
  <Nav className={className}>
    {[
      ['/', 'about'],
      ['/design', 'design'],
      ['/drawing', 'drawing'],
      ['/portraits', 'portraits'],
      ['/blog', 'blog'],
      ['/cv', 'cv'],
    ].map(([
      href,
      text,
    ]) => <NavItem href={href} key={text} selected={selectedItem === text}>{text}</NavItem>)}
  </Nav>
);

export const Menu = Object.freeze({
  ABOUT: 'about',
  DESIGN: 'design',
  DRAWING: 'drawing',
  PORTRAITS: 'portraits',
  BLOG: 'blog',
  CV: 'cv',
});

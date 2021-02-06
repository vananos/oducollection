import React from 'react';
import { Link } from 'gatsby';
import styles from './navbar.module.scss';

function NavItem({
  href,
  children,
}) {
  const { pathname } = window.location;
  const isSelected = (href === '/' && pathname === '/')
    || (href !== '/' && pathname.startsWith(href));
  return (
    <li className={[styles.navItem, isSelected ? styles.selected : ''].join(' ')}>
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

export default ({ className }) => (
  <Nav className={className}>
    <NavItem href="/">about</NavItem>
    <NavItem href="/design">design</NavItem>
    <NavItem href="/drawing">drawing</NavItem>
    <NavItem href="/portrait">portrait</NavItem>
    <NavItem href="/blog">blog</NavItem>
    <NavItem href="/cv">cv</NavItem>
  </Nav>
);

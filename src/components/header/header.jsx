import React from 'react';
import { Link } from 'gatsby';
import InlineSVG from 'react-inlinesvg';
import styles from './header.module.scss';
import logo from '../../../static/img/odu.logo.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
    };
    this.showToTop = this.showToTop.bind(this);
    this.toTop = this.toTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.showToTop());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.showToTop());
  }

  showToTop() {
    const { shown } = this.state;
    const { scrollY } = window;
    if (scrollY > 50 && !shown) {
      this.setState({ shown: true });
    } else if (scrollY < 50 && shown) {
      this.setState({ shown: false });
    }
  }

  toTop() {
    const { shown } = this.state;
    if (shown) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const {
      className = '',
    } = this.props;

    const { shown } = this.state;

    return (
      <header
        role="button"
        tabIndex={0}
        className={`${styles.header} ${className} ${shown ? styles.topShown : ''}`.trim()}
        onClick={() => this.toTop()}
        onKeyDown={() => this.toTop()}
      >
        <Link to="/" className={styles.odu}>
          <InlineSVG src={logo} className={styles.logoIcon} />
        </Link>
        <div className={styles.collection}>Collection</div>
        <div
          className={styles.top}
        />
      </header>
    );
  }
}

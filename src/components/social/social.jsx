import React from 'react';
import InlineSVG from 'react-inlinesvg';
import instagramIcon from '../../../static/img/social/instagram.svg';
import behanceIcon from '../../../static/img/social/behance.svg';
import telegramIcon from '../../../static/img/social/telegram.svg';
import linkedinIcon from '../../../static/img/social/linkedin.svg';
import facebookIcon from '../../../static/img/social/facebook.svg';
import emailIcon from '../../../static/img/social/email.svg';
import styles from './social.module.scss';

export default ({ className = '' }) => {
  function IconLink({
    href,
    icon,
  }) {
    return (
      <li>
        <a href={href} target="_blank" rel="noreferrer">
          <InlineSVG src={icon} className={styles.icon} />
        </a>
      </li>
    );
  }

  return (
    <ul className={`${styles.social} ${className}`.trim()}>
      <IconLink href="https://www.instagram.com/oduvaha" icon={instagramIcon} />
      <IconLink href="https://www.behance.net/oduvaha" icon={behanceIcon} />
      <IconLink href="http://telegram.me/oduvaha" icon={telegramIcon} />
      <IconLink
        href="https://www.linkedin.com/in/olga-ekimovskaia-56a877188/"
        icon={linkedinIcon}
      />
      {/* <IconLink href="https://wa.me/+358452099917" icon={whatsappIcon} /> */}
      <IconLink href="https://www.facebook.com/0duvaha" icon={facebookIcon} />
      <li>
        <a href="mailto:olga.oduvaxa@gmail.com">
          <InlineSVG src={emailIcon} className={styles.icon} />
        </a>
      </li>
    </ul>
  );
};

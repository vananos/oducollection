import React from 'react';
import InlineSVG from 'react-inlinesvg';
import styles from './like.module.scss';
import starBorder from '../../../static/star-border.svg';
import starFull from '../../../static/star-full.svg';

const storageId = (id) => `liked_${id}`;

const w = typeof window !== 'undefined' && window;

export default class Like extends React.Component {
  constructor(props) {
    super(props);
    const {
      resourceId,
      likesCount,
    } = props;

    const storageAvailable = !!w.localStorage;

    this.state = {
      liked: !storageAvailable || Boolean(w.localStorage.getItem(storageId(resourceId))),
      updating: false,
      resourceId,
      likesCount,
    };
  }

  like() {
    const {
      resourceId,
      likesCount,
      liked,
    } = this.state;
    if (liked) {
      return;
    }

    w.localStorage.setItem(storageId(resourceId), String(true));

    fetch('.netlify/functions/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resourceId,
      }),
    })
      .then(
        (res) => {
          if (res.ok) {
            this.setState({
              likesCount: likesCount + 1,
              updating: false,
              liked: true,
            });
          }
        },
      )
      .catch(() => w.localStorage.removeItem(storageId(resourceId)));

    this.setState({
      updating: true,
    });
  }

  render() {
    const {
      liked,
      likesCount,
      updating,
    } = this.state;
    return (
      <div className={[styles.like, updating ? styles.updating : ''].join(' ')}>
        <InlineSVG
          src={liked || updating ? starFull : starBorder}
          className={[styles.icon, liked ? '' : styles.notLiked].join(' ')}
          onClick={() => this.like()}
        />
        <p>{likesCount}</p>
      </div>
    );
  }
}

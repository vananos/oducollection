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
    this.shouldUpdateLike = true;
    this.state = {
      liked: !storageAvailable || w.localStorage.getItem(storageId(resourceId)) === 'true',
      updating: false,
      resourceId,
      likesCount,
    };
  }

  componentWillUnmount() {
    if (this.shouldUpdateLike) {
      this.shouldUpdateLike = false;
    }
  }

  like() {
    const {
      resourceId,
      likesCount,
      liked,
      updating,
    } = this.state;
    if (updating) {
      return;
    }
    const newLikedState = !liked;

    fetch('.netlify/functions/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likedState: newLikedState ? 'liked' : 'unliked',
        resourceId,
      }),
    })
      .then(
        (res) => {
          if (res.ok && this.shouldUpdateLike) {
            w.localStorage.setItem(storageId(resourceId), String(newLikedState));
            this.setState({
              likesCount: likesCount + (newLikedState ? 1 : -1),
              updating: false,
              liked: newLikedState,
            });
          }
        },
      );

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
      <div
        className={[styles.like, updating ? styles.updating : '', liked ? '' : styles.notLiked].join(' ')}
        onClick={() => this.like()}
      >
        <InlineSVG
          src={liked || updating ? starFull : starBorder}
        />
        <p>{likesCount}</p>
      </div>
    );
  }
}

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from './post-preview.module.scss';
import { minutesToRead, reachTextToText, toArticlePath } from '../../../utils/utils';
import Like from '../../star/like';

export default ({ data }) => {
  const {
    id,
    postPreviewImage,
    slug,
    title,
    shortDescription,
    createdAt,
    content,
    likes,
  } = data;
  const [likesCount, setLikes] = useState(0);

  useEffect(() => likes(id)
    .then((currentLikesCount) => {
      if (currentLikesCount !== likesCount) {
        setLikes(currentLikesCount);
      }
    }));

  return (
    <article className={styles.postPreview}>
      {postPreviewImage
      && (
        <div className={styles.previewImg}>
          <Img fixed={postPreviewImage.fixed} alt={postPreviewImage.title} />
        </div>
      )}
      <div className={styles.postDescription}>
        <h1>
          <Link to={toArticlePath(slug)}>
            {title}
          </Link>
        </h1>
        <p>{shortDescription}</p>
        <footer>
          <div>{createdAt}</div>
          <div>
            {minutesToRead(reachTextToText(JSON.parse(content.raw)))}
            {' '}
            min read
          </div>
          <Like resourceId={id} likesCount={likesCount} key={`${id}-${likesCount}`} />
        </footer>
      </div>
    </article>
  );
};

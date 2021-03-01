import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styles from './post-preview.module.scss';
import { minutesToRead, reachTextToText, toArticlePath } from '../../../utils/utils';
import Like from '../../star/like';
import Carousel from '../../carousel/carousel';

export default ({ data }) => {
  const {
    id,
    type,
    postPreviewImage,
    slug,
    title,
    shortDescription,
    createdAt,
    content,
    likes,
  } = data;

  const isDrawing = type.includes('drawing');
  return (
    <article className={styles.postPreview}>
      <div className={styles.descriptionWrapper}>
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
            <Like resourceId={id} likesCount={likes} key={`${id}-${likes}`} />
          </footer>
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        {isDrawing && <Carousel photos={content.references} />}
      </div>
    </article>
  );
};

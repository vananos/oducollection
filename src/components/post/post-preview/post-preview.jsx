import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from './post-preview.module.scss';
import { minutesToRead, reachTextToText, toArticlePath } from '../../../utils/utils';

export default function PostPreview({ data }) {
  const { postPreviewImage } = data;
  return (
    <article className={styles.postPreview}>
      <div className={styles.previewImg}>
        {postPreviewImage && <Img fixed={postPreviewImage.fixed} alt={postPreviewImage.title} />}
      </div>
      <div className={styles.postDescription}>
        <h1>
          <Link to={toArticlePath(data.slug)}>
            {data.title}
          </Link>
        </h1>
        <p>{data.shortDescription}</p>
        <footer>
          <div>{data.createdAt}</div>
          <div>
            {minutesToRead(reachTextToText(JSON.parse(data.content.raw)))}
            {' '}
            min read
          </div>
        </footer>
      </div>
    </article>
  );
}

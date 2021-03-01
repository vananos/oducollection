import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import 'react-image-lightbox/style.css';
import styles from './portraits.module.scss';
import Carousel from '../components/carousel/carousel';
import { Menu } from '../components/navbar/navbar';
import Like from '../components/star/like';
import { likesProvider } from '../utils/utils';

export default ({ data }) => {
  const {
    allContentfulPortraits: {
      edges: portraits,
    },
  } = data;

  const [likes, setLikes] = useState({});
  useEffect(() => {
    likesProvider(portraits.map(({ node: { id } }) => id)).then((likesCount) => {
      setLikes(likesCount);
    });
  }, []);
  console.log(likes);
  return (
    <Layout selectedMenuItem={Menu.PORTRAITS}>
      <section className={styles.portraits}>
        {
          portraits.map(({
            node: {
              id,
              title,
              createdAt,
              photos,
            },
          }) => (
            <div key={id} className={styles.photoSet}>
              <div>
                <h1>{title}</h1>
                <div className={styles.sessionInfo}>
                  <span>{createdAt}</span>
                  <div className={styles.likeWrapper}>
                    <Like resourceId={id} likesCount={likes[id] || 0} key={`${id}-${likes[id]}`} />
                  </div>
                </div>
              </div>
              <Carousel photos={photos} />
            </div>
          ))
        }
      </section>
    </Layout>
  );
};

export const blogListQuery = graphql`
query portraitsQuery {
  allContentfulPortraits(
    sort: { fields: [createdAt], order: DESC }
  ) {
    edges {
      node {
        id
        title
        createdAt(formatString: "Do MMMM YYYY")
        photos {
          id
          fixed(width: 240, height: 340) {
            ...GatsbyContentfulFixed_tracedSVG
          }
          file {
            url
          }
          title
          description
        }
      }
    }
  }
}
`;

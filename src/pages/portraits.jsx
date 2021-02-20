import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import 'react-image-lightbox/style.css';
import styles from './portraits.module.scss';
import Carousel from '../components/carousel/carousel';
import { Menu } from '../components/navbar/navbar';

export default ({ data }) => {
  const {
    allContentfulPortraits: {
      edges: portraits,
    },
  } = data;

  return (
    <Layout selectedMenuItem={Menu.PORTRAITS}>
      <section className={styles.portraits}>
        {
          portraits.map(({ node }) => (
            <div key={node.id} className={styles.photoSet}>
              <h1>{node.title}</h1>
              <Carousel photos={node.photos} />
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
        createdAt
        photos {
          id
          fixed(width: 240, height: 340) {
            ...GatsbyContentfulFixed_tracedSVG
          }
          file {
            url
          }
          title
        }
      }
    }
  }
}
`;

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout/layout';
import PostList from '../../components/post/post-list/post-list';
import styles from './posts.module.scss';
import { typeToMenuItem } from '../../utils/utils';

export default ({
  data,
  pageContext,
}) => {
  const posts = data.allContentfulPost.edges;
  const {
    currentPage,
    type,
  } = pageContext;
  return (
    <Layout selectedMenuItem={typeToMenuItem(type)}>
      <PostList posts={posts} />
      <footer className={styles.footer}>
        {
          pageContext.pagePaths.length > 1
            ? pageContext.pagePaths
              .map((pagePath, i) => {
                const pageNumber = i + 1;
                const selectedClass = pageNumber === currentPage ? styles.selected : undefined;
                return (
                  <a
                    href={pagePath}
                    key={pagePath}
                    className={selectedClass}
                  >
                    {pageNumber}
                  </a>
                );
              })
            : undefined
        }
      </footer>
    </Layout>

  );
};

export const blogListQuery = graphql`
query blogListQuery($skip: Int!, $limit: Int!, $type: String!) {
     allContentfulPost (
      sort: { fields: [createdAt], order: DESC }
      limit: $limit
      skip: $skip
      filter: {type: {eq: $type}}
     ){
        edges {
          node {
            id
            title
            tags
            type
            slug
            shortDescription
            postPreviewImage {
              fixed(width: 300, height: 200) {
                ...GatsbyContentfulFixed_tracedSVG
              }
              description
              title
            }
          content {
            raw
            references {
              ... on ContentfulAsset {
                id
                contentful_id
                title
                description
                fixed(width: 240, height: 340) {
                  ...GatsbyContentfulFixed_tracedSVG
                }
                file {
                  url
                }
              }
            }
          }
          createdAt(formatString: "Do MMMM YYYY")
        }
      }
    }
}`;

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout/layout';
import {
  minutesToRead, reachTextToText, renderReachText, typeToMenuItem,
} from '../../utils/utils';
import styles from './post.module.scss';

export default ({
  data,
  pageContext,
}) => {
  const {
    title,
    content,
    type,
    createdAt,
  } = data.contentfulPost;

  return (
    <Layout selectedMenuItem={typeToMenuItem(type)}>
      <article className={styles.article}>
        <header>
          <h1>{title}</h1>
          <div>{createdAt}</div>
          <div>
            {minutesToRead(reachTextToText(JSON.parse(content.raw)))}
            {' '}
            min read
          </div>
        </header>
        <section>
          {renderReachText(content)}
        </section>
      </article>
    </Layout>
  );
};

export const blogQuery = graphql`
  query blogQuery($id: String!) {
    contentfulPost(id: { eq: $id }) {
      id
      title
      tags
      type
      slug
      createdAt(formatString: "Do MMMM YYYY")
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            __typename
            fluid(maxWidth: 980) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

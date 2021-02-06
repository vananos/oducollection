import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout/layout';
import { renderReachText } from '../../utils/utils';

export default ({
  data,
  pageContext,
}) => {
  const {
    title,
    content,
  } = data.contentfulPost;
  return (
    <Layout>
      <article>
        <h1>{title}</h1>
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

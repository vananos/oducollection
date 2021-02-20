import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout/layout';
import styles from './index.module.scss';
import { renderReachText } from '../utils/utils';
import { Menu } from '../components/navbar/navbar';

export default () => {
  const data = useStaticQuery(
    graphql`
      query AboutQuery {
        allContentfulAbout(limit: 1) {
        edges {
          node {
            title
            tags
            content {
              raw
            }
          }
        }
      }
    }`,
  ).allContentfulAbout.edges[0].node;

  return (
    <Layout selectedMenuItem={Menu.ABOUT}>
      <article className={styles.about}>
        <header>
          <h1>{data.title}</h1>
        </header>
        <section>
          {renderReachText(data.content)}
        </section>
      </article>
    </Layout>
  );
};

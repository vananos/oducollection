const path = require('path');

exports.createPages = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql(`
    query PostsRequest {
      allContentfulPost {
        edges {
          node {
            id
            slug
            type
          }
        }
      }
    }`);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const postsByTypeCount = {
    design: 0,
    blog: 0,
    drawing: 0,
  };

  result.data.allContentfulPost.edges.forEach((item) => {
    const {
      id,
      slug,
    } = item.node;
    createPage({
      path: `/article/${slug}`,
      component: path.resolve('./src/templates/post/post.jsx'),
      context: {
        id,
      },
    });

    item.node.type.forEach((type) => {
      if (postsByTypeCount[type] !== undefined) {
        postsByTypeCount[type] += 1;
      }
    });
  });

  Object.entries(postsByTypeCount)
    .forEach((entry) => {
      const [prefix, postsCount] = entry;
      const postsPerPage = 10;
      const numPages = Math.ceil(postsCount / postsPerPage);

      const pagePaths = Array.from({ length: numPages })
        .map((_, i) => `/${prefix}${(i === 0 ? '' : `/${i + 1}`)}`);

      pagePaths.forEach((pagePath, i) => {
        createPage({
          path: pagePath,
          component: path.resolve('./src/templates/posts/posts.jsx'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            pagePaths,
            numPages,
            type: prefix,
          },
        });
      });
    });
};

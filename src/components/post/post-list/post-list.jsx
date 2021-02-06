import React from 'react';
import PostPreview from '../post-preview/post-preview';

export default ({
  posts,
}) => (
  <section>
    {posts.map(({ node }) => <PostPreview data={node} key={node.id} />)}
  </section>
);

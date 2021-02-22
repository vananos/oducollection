import React from 'react';
import PostPreview from '../post-preview/post-preview';
import { likesProvider } from '../../../utils/utils';

export default ({
  posts,
}) => {
  const likes = likesProvider(posts.map(({ node }) => node.id));
  return (
    <section>
      {posts.map(({ node }) => <PostPreview data={{ ...node, likes }} key={node.id} />)}
    </section>
  );
};

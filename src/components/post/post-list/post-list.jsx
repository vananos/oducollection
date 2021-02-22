import React, { useEffect, useState } from 'react';
import PostPreview from '../post-preview/post-preview';
import { likesProvider } from '../../../utils/utils';

export default ({
  posts,
}) => {
  const [likes, setLikes] = useState({});
  useEffect(() => {
    likesProvider(posts.map(({ node }) => node.id)).then((likesCount) => setLikes(likesCount));
  }, []);
  return (
    <section>
      {posts.map(({ node }) => <PostPreview data={{ ...node, likes: likes[node.id] || 0 }} key={node.id} />)}
    </section>
  );
};

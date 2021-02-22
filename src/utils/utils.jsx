import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Img from 'gatsby-image';
import { Menu } from '../components/navbar/navbar';

export function minutesToRead(text) {
  return Math.max(Math.round(text.split(/\s+/).length / 150), 1);
}

export function renderReachText(rawContent) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Img
          fluid={node.data.target.fluid}
          alt={node.data.target.title}
        />
      ),
    },
  };
  return renderRichText(rawContent, options);
}

export function reachTextToText(reachTextNode) {
  if (reachTextNode.nodeType === 'text') {
    return reachTextNode.value;
  }
  if (reachTextNode.content) {
    return reachTextNode.content
      .map(reachTextToText)
      .join(' ');
  }
  return '';
}

export function toArticlePath(slug) {
  return `/article/${slug}`;
}

export function typeToMenuItem(type) {
  const effectiveType = Array.isArray(type) ? type[0] : type;

  const TypeMenuMap = {
    design: Menu.DESIGN,
    drawing: Menu.DRAWING,
    blog: Menu.BLOG,
  };

  return TypeMenuMap[effectiveType] || Menu.ABOUT;
}

export function likesProvider(resourceIds) {
  let likes = null;
  return async (resourceId) => {
    if (!likes) {
      likes = fetch('.netlify/functions/get-likes-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceIds,
        }),
      }).then((res) => res.json());
    }
    return (await likes)[resourceId] || 0;
  };
}

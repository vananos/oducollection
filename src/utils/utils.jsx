import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Img from 'gatsby-image';

export function toFormattedDateString(dateString) {
  const date = new Date(dateString);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return [date.getDay() + 1, monthNames[date.getMonth()], date.getFullYear()].join(' ');
}

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

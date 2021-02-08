import React, { Component } from 'react';
import Img from 'gatsby-image';
import Layout from '../components/layout/layout';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import styles from './portraits.module.scss';

export default class Portraits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      images: null,
      isOpen: false,
      data: props.data
    };
  }

  render() {
    const {
      idx,
      isOpen,
      images,
      data
    } = this.state;

    const {
      allContentfulPortraits: {
        edges: portraits
      }
    } = data;

    return (
      <Layout>
        <section className={styles.portraits}>
          {
            portraits.map(({ node }, i) => {
              const fluidImages = node.photos.map(node => node.file.url);

              return (
                <div key={i} className={styles.photoSet}>
                  <h1>{node.title}</h1>
                  <div className={styles.setPreview}>
                    {node.photos
                      .map((image, idx) => (
                        <div
                          onClick={() => {
                            this.setState({
                              idx,
                              images: fluidImages,
                              isOpen: true
                            });
                          }}
                          className={styles.previewCard}
                        >
                          <Img
                            key={idx}
                            fixed={image.fixed}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })
          }
        </section>
        {isOpen && (
          <Lightbox
            mainSrc={images[idx]}
            nextSrc={images[(idx + 1) % images.length]}
            prevSrc={images[idx + images.length - 1] % images.length}
            onCloseRequest={() => this.setState({
              isOpen: false
            })}
            onMovePrevRequest={() => this.setState({
              idx: (idx + images.length - 1) % images.length
            })}
            onMoveNextRequest={() => this.setState({
              idx: (idx + 1) % images.length
            })}
          />
        )}
      </Layout>
    );
  }
}

export const blogListQuery = graphql`
query portraitsQuery {
  allContentfulPortraits {
    edges {
      node {
        title
        createdAt
        photos {
          fixed(width: 240, height: 340) {
            ...GatsbyContentfulFixed_tracedSVG
          }
          file {
            url
          }
          title
        }
      }
    }
  }
}           
`;

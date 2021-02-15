import React from 'react';
import Img from 'gatsby-image';
import Lightbox from 'react-image-lightbox';
import styles from './carousel.module.scss';

const TIMEOUT = 10;
const DELTA = 15;

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();

    this.state = {
      photoPreview: false,
      scrollToLeft: false,
      scrollToRight: false,
    };

    this.scrollListener = this.scrollListener.bind(this);
    this.scrollLeftIntervalId = null;
    this.scrollLeftRightId = null;
  }

  componentDidMount() {
    this.carouselRef.current.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  }

  componentWillUnmount() {
    this.carouselRef.current.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  }

  scrollListener() {
    const {
      scrollWidth,
      scrollLeft,
    } = this.carouselRef.current;

    const { width } = this.carouselRef.current.getBoundingClientRect();
    const { scrollToLeft } = this.state;
    const canScrollToRight = scrollLeft + width < scrollWidth;
    if (scrollLeft === 0) {
      this.setState({
        scrollToLeft: false,
        scrollToRight: canScrollToRight,
      });
    } else if (!canScrollToRight || !scrollToLeft) {
      this.setState({
        scrollToLeft: true,
        scrollToRight: canScrollToRight,
      });
    }
  }

  scroll(delta) {
    const {
      scrollWidth,
      scrollLeft,

    } = this.carouselRef.current;

    const newScrollLeft = Math.max(0, Math.min(scrollLeft + delta, scrollWidth));

    this.carouselRef.current.scrollLeft = newScrollLeft;
  }

  render() {
    const {
      photos,
    } = this.props;

    const {
      idx,
      photoPreview,
      images,
      scrollToLeft,
      scrollToRight,
    } = this.state;

    const fluidImages = photos.map((node) => node.file.url);

    return (
      <div>
        <div className={styles.carouselWrapper}>
          <div
            className={[styles.arrow, styles.left, scrollToLeft ? styles.shown : ''].join(' ')}
            onMouseDown={() => {
              this.scrollLeftIntervalId = setInterval(() => this.scroll(-DELTA), TIMEOUT);
            }}
            onMouseUp={() => {
              clearInterval(this.scrollLeftIntervalId);
            }}
          />
          <div className={styles.carousel}>
            <div ref={this.carouselRef}>
              {photos.map((image, i) => (
                <div
                  onClick={() => {
                    this.setState({
                      idx: i,
                      images: fluidImages,
                      photoPreview: true,
                    });
                  }}
                  className={styles.carouselCard}
                  key={image.id}
                >
                  <Img
                    fixed={image.fixed}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={[styles.arrow, styles.right, scrollToRight ? styles.shown : ''].join(' ')}
            onMouseDown={() => {
              this.scrollLeftIntervalId = setInterval(() => this.scroll(+DELTA), TIMEOUT);
            }}
            onMouseUp={() => {
              clearInterval(this.scrollLeftIntervalId);
            }}
          />
        </div>
        {photoPreview && (
          <Lightbox
            mainSrc={images[idx]}
            nextSrc={images[(idx + 1) % images.length]}
            prevSrc={images[idx + images.length - 1] % images.length}
            onCloseRequest={() => this.setState({
              photoPreview: false,
            })}
            onMovePrevRequest={() => this.setState({
              idx: (idx + images.length - 1) % images.length,
            })}
            onMoveNextRequest={() => this.setState({
              idx: (idx + 1) % images.length,
            })}
          />
        )}
      </div>
    );
  }
}

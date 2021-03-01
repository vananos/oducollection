import React from 'react';
import Img from 'gatsby-image';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
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
    this.scrollRightIntervalId = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scrollListener);
  }

  scrollListener() {
    const {
      scrollWidth,
      scrollLeft,
    } = this.carouselRef.current;

    const { width } = this.carouselRef.current.getBoundingClientRect();
    const {
      scrollToLeft,
      scrollToRight,
    } = this.state;
    const canScrollToRight = scrollLeft + width < scrollWidth;
    const canScrollLeft = scrollLeft > 0;
    if (scrollToLeft !== canScrollLeft || scrollToRight !== canScrollToRight) {
      this.setState({
        scrollToLeft: canScrollLeft,
        scrollToRight: canScrollToRight,
      });
    }
  }

  scroll(delta) {
    const {
      scrollWidth,
      scrollLeft,
    } = this.carouselRef.current;

    this.carouselRef.current.scrollLeft = Math.max(0, Math.min(scrollLeft + delta, scrollWidth));
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
            onMouseLeave={() => {
              clearInterval(this.scrollLeftIntervalId);
            }}
          />
          <div className={styles.carousel} ref={this.carouselRef} onScroll={this.scrollListener}>
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
          <div
            className={[styles.arrow, styles.right, scrollToRight ? styles.shown : ''].join(' ')}
            onMouseDown={() => {
              this.scrollRightIntervalId = setInterval(() => this.scroll(+DELTA), TIMEOUT);
            }}
            onMouseUp={() => {
              clearInterval(this.scrollRightIntervalId);
            }}
            onMouseLeave={() => {
              clearInterval(this.scrollRightIntervalId);
            }}
          />
        </div>
        {photoPreview && (
          <Lightbox
            imagePadding={50}
            imageTitle={photos[idx].title}
            imageDescription={photos[idx].description}
            mainSrc={images[idx]}
            nextSrc={images[(idx + 1) % images.length]}
            prevSrc={images[(idx + images.length - 1) % images.length]}
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

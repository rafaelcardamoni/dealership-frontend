import ImageViewer from 'react-simple-image-viewer';
import { useContext } from 'react';
import { ImageViewerContext } from '../../contexts/ImageViewerContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

interface ImageProps {
  data: [
    {
      id: number;
      path: string;
    }
  ];
}

export function CarImageCarouselMain({ data }: ImageProps) {
  const { currentImage, isViewerOpen, openImageViewer, closeImageViewer } =
    useContext(ImageViewerContext);

  const images = [...new Set(data.map(images => images.path))];

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className={styles.swiperContainer}
      >
        {data.map((image, index) => (
          <SwiperSlide key={image.id} className={styles.swiperSlide}>
            <img
              src={image.path}
              alt="car for sale"
              onClick={() => openImageViewer(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper spaceBetween={10} slidesPerView={3} className={styles.thumbnail}>
        {data.map((image, index) => {
          return (
            <SwiperSlide key={image.id}>
              <img
                src={image.path}
                alt="thumbnail - car for sale"
                onClick={() => openImageViewer(index)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
}

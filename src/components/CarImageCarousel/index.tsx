import { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

// install Swiper modules
SwiperCore.use([Thumbs]);

interface ImageProps {
  images: [
    {
      id: string;
      path: string;
    }
  ];
}

export function CarImageCarousel({ images }: ImageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainImg}
      >
        {images.map(image => {
          return (
            <SwiperSlide key={image.id}>
              <img src={image.path} alt="car for sale" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.thumbnail}
      >
        {images.map(image => {
          return (
            <SwiperSlide key={image.id}>
              <img src={image.path} alt="car for sale" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

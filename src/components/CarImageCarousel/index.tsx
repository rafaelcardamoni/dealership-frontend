import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

interface ImageProps {
  images: [
    {
      id: string;
      path: string;
    }
  ];
}

export function CarImageCarousel({ images }: ImageProps) {
  return (
    <>
      <Swiper spaceBetween={10} className={styles.mainImg}>
        {images.map(image => {
          return (
            <SwiperSlide key={image.id}>
              <img src={image.path} alt="car for sale" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper spaceBetween={10} slidesPerView={3} className={styles.thumbnail}>
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

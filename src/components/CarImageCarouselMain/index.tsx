import ImageViewer from 'react-simple-image-viewer';
import { useCallback, useContext, useState } from 'react';
import { ImageViewerContext } from '../../contexts/ImageViewerContext';

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
      {data.map((image, index) => (
        <img
          src={image.path}
          onClick={() => openImageViewer(index)}
          width="300"
          key={image.id}
          style={{ margin: '2px' }}
          alt=""
        />
      ))}

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

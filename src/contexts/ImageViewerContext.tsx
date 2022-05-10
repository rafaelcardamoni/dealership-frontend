import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';

interface ImageViewerContextProps {
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
  isViewerOpen: boolean;
  setIsViewerOpen: Dispatch<SetStateAction<boolean>>;
  openImageViewer: (index: any) => void;
  closeImageViewer: () => void;
}

export const ImageViewerContext = createContext<ImageViewerContextProps>(
  {} as ImageViewerContextProps
);

interface ImageViewerProviderProps {
  children: ReactNode;
}

export const ImageViewerProvider = ({ children }: ImageViewerProviderProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <ImageViewerContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        isViewerOpen,
        setIsViewerOpen,
        openImageViewer,
        closeImageViewer
      }}
    >
      {children}
    </ImageViewerContext.Provider>
  );
};

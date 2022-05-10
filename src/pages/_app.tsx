import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.scss';
import { CarsProvider } from '../contexts/CarsContext';
import { ImageViewerProvider } from '../contexts/ImageViewerContext';

function MyApp({ Component, pageProps }) {
  return (
    <CarsProvider>
      <ImageViewerProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ImageViewerProvider>
    </CarsProvider>
  );
}

export default MyApp;

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarsProvider } from '../contexts/CarsContext';
import { ImageViewerProvider } from '../contexts/ImageViewerContext';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CarsProvider>
        <ImageViewerProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ImageViewerProvider>
      </CarsProvider>
    </AuthProvider>
  );
}

export default MyApp;

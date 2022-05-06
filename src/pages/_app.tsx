import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.scss';
import { CarsProvider } from '../contexts/CarsContext';

function MyApp({ Component, pageProps }) {
  return (
    <CarsProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </CarsProvider>
  );
}

export default MyApp;

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { CarImageCarouselMain } from '../../components/CarImageCarouselMain';
import { getServerSideApi } from '../../services/serverSideApi';
import styles from '../../styles/[id].module.scss';

interface CarProps {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: string;
  price: number;
  engine: string;
  mileage: number;
  transmission: string;
  power?: number;
  fuel: string;
  city_consumption?: number;
  road_consumption?: number;
  type?: string;
  color?: string;
  range?: number;
  images: [
    {
      id: string;
      path: string;
    }
  ];
}

export default function CarDetails({ data }) {
  const [carInfo] = useState<CarProps[]>(data);
  const [imageData, setImageData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    carInfo.map(car => {
      setImageData(car.images);
    });
  });

  function shareURL() {
    if (typeof window !== 'undefined') {
      const data = {
        url: window.location.href
      };
      navigator.share(data);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <CarImageCarouselMain data={imageData} />
      </section>

      <section className={styles.carInfo}>
        {carInfo.map(car => {
          return (
            <span key={car.id}>
              <div className={styles.details}>
                <h1
                  className={styles.carTitle}
                >{`${car.make} ${car.model} ${car.trim}`}</h1>
                <div className={styles.grid}>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Ano</span>
                    <span className={styles.description}>{`${car.year}`}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Quilometragem</span>
                    <span
                      className={styles.description}
                    >{`${new Intl.NumberFormat('pt-BR').format(
                      car.mileage
                    )} km`}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Potência</span>
                    <span
                      className={styles.description}
                    >{`${car.power} cv`}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Motor</span>
                    <span className={styles.description}>{car.engine}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Transmissão</span>
                    <span className={styles.description}>
                      {car.transmission}
                    </span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Combustível</span>
                    <span className={styles.description}>{car.fuel}</span>
                  </div>
                  {car.fuel === 'Elétrico' ? (
                    <div className={styles.gridItem}>
                      <span className={styles.title}>Alcance</span>
                      <span className={styles.description}>
                        {new Intl.NumberFormat('pt-BR').format(car.range)} km
                      </span>
                    </div>
                  ) : null}
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Consumo na cidade</span>
                    <span className={styles.description}>
                      {car.city_consumption === null
                        ? '0'
                        : car.city_consumption}{' '}
                      km/l
                    </span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Consumo na estrada</span>
                    <span className={styles.description}>
                      {car.road_consumption === null
                        ? '0'
                        : car.road_consumption}{' '}
                      km/l
                    </span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Cor</span>
                    <span className={styles.description}>{car.color}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Carroceria</span>
                    <span className={styles.description}>{car.type}</span>
                  </div>
                </div>
              </div>

              <div className={styles.priceAndContact}>
                <div className={styles.price}>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(car.price)}
                  </span>
                </div>
                <div className={styles.buttons}>
                  <Button
                    text="Entre em contato"
                    height="25px"
                    padding=".7rem 1rem .5rem .5rem"
                    hoverColorClass="textColorFilter"
                    onClick={() => {
                      router.push('/contact-us');
                    }}
                  />
                  <Button
                    text="Compartilhe"
                    onClick={shareURL}
                    height="25px"
                    padding=".7rem 1rem .5rem .5rem"
                    hoverColorClass="textColorFilter"
                  />
                </div>
                <div className={styles.logo}></div>
              </div>
            </span>
          );
        })}
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  const serverSideApi = getServerSideApi(ctx);
  const response = await serverSideApi
    .get(`/api/cars`)
    .then(response => response.data);

  const paths = response.map(car => {
    return {
      params: {
        id: car.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const serverSideApi = getServerSideApi(ctx);
  const id = ctx.params.id;

  const data = await serverSideApi
    .get(`/api/car/${id}`)
    .then(response => response.data);

  return {
    props: {
      data
    }
  };
};

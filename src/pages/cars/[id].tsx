import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { CarImageCarouselMain } from '../../components/CarImageCarouselMain';
import { Logo } from '../../components/Logo';
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

  useEffect(() => {
    carInfo.map(car => {
      setImageData(car.images);
    });
  });

  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <CarImageCarouselMain data={imageData} />
      </section>

      <section className={styles.carInfo}>
        {carInfo.map(car => {
          return (
            <>
              <div className={styles.details} key={car.id}>
                <h1
                  className={styles.carTitle}
                >{`${car.make} ${car.model} ${car.trim}`}</h1>
                <div className={styles.grid}>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Quilometragem</span>
                    <span
                      className={styles.description}
                    >{`${car.mileage} km`}</span>
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
                    <span className={styles.title}>Combustível</span>
                    <span className={styles.description}>{car.fuel}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Consumo na cidade</span>
                    <span
                      className={styles.description}
                    >{`${car.city_consumption} km/l`}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <span className={styles.title}>Consumo na estrada</span>
                    <span
                      className={styles.description}
                    >{`${car.road_consumption} km/l`}</span>
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
                <h1>Descrição</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Minus ipsam nihil quae quod. Laudantium quidem nesciunt
                  doloribus quo voluptatum expedita dolore facere, quis,
                  excepturi eius fugit minima numquam quod aliquam. Nobis porro
                  veritatis incidunt odit atque maxime voluptatibus ratione ea.
                </p>

                <h1>Acessórios</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem voluptatum alias est, dicta corrupti doloribus
                  beatae odit eos, voluptate sed facilis officia placeat
                  aspernatur officiis enim excepturi temporibus vero quod
                  incidunt porro. Exercitationem adipisci reiciendis accusamus,
                  aperiam consequatur provident esse!
                </p>
                <h1>Preço</h1>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(car.price)}
                </span>
                <Button text="Entre em contato" />
                <div className={styles.logo}></div>
              </div>
            </>
          );
        })}
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios
    .get(`${process.env.BASE_URL}/api/cars`)
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

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params.id;

  const data = await axios
    .get(`${process.env.BASE_URL}/api/car/${id}`)
    .then(response => response.data);

  return {
    props: {
      data
    }
  };
};

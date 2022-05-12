import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import { Banner } from '../components/Banner';
import { CarsCardSmall } from '../components/CarsCardSmall';
import { GetStaticProps } from 'next';
import { Button } from '../components/Button';
import Link from 'next/link';

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

export default function Home({ data }) {
  const [cars, setCars] = useState<CarProps[]>(data);

  return (
    <>
      <Head>
        <title>dealership</title>
      </Head>

      <main>
        <section className={styles.banner}>
          <Banner />
        </section>

        <section className={styles.hero}>
          <h1>Veículos em estoque</h1>
          <div className={styles.grid}>
            {cars.map(car => {
              return <CarsCardSmall key={car.id} car={car} />;
            })}
          </div>

          <Link href="/inventory">
            <a>
              <Button text="Ver todos os veículos" />
            </a>
          </Link>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios
    .get(`${process.env.BASE_URL}/api/cars/4`)
    .then(response => response.data);

  return {
    props: {
      data
    },
    revalidate: 60 * 5 // 5 minutes in seconds
  };
};

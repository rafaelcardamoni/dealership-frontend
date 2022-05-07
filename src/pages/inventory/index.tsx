import axios from 'axios';
import { GetStaticProps } from 'next';
<<<<<<< HEAD
import { useContext, useState } from 'react';
import { CarsCardSmall } from '../../components/CarsCardSmall';
import { CarsContext } from '../../contexts/CarsContext';
import styles from './styles.module.scss';

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
=======
import { useState } from 'react';
import { CarsCardSmall } from '../../components/CarsCardSmall';
import { SearchFilters } from '../../components/SearchFilters';
import styles from '../../styles/Inventory.module.scss';
>>>>>>> testing

export default function Inventory({ cars }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
<<<<<<< HEAD
    <>
      <section className={styles.filter}>
=======
    <div className={styles.container}>
      <section className={styles.search}>
>>>>>>> testing
        <input
          type="text"
          placeholder="Pesquise por termo, modelo, marca..."
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        />
      </section>

<<<<<<< HEAD
      <section className={styles.hero}>
=======
      <section className={styles.filters}>
        <div className={styles.filtersContainer}>
          <SearchFilters />
        </div>
      </section>

      <section className={styles.cards}>
>>>>>>> testing
        <div className={styles.grid}>
          {cars
            .filter(car => {
              if (searchTerm === '') {
                return car;
              } else if (
                car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.trim.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.color.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return car;
              }
            })
            .map(car => {
              return <CarsCardSmall key={car.id} car={car} />;
            })}
        </div>
      </section>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> testing
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cars = await axios
    .get(`${process.env.BASE_URL}/api/cars`)
    .then(response => response.data);

  return {
    props: {
      cars
    }
  };
};

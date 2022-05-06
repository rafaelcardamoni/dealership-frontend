import axios from 'axios';
import { GetStaticProps } from 'next';
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

export default function Inventory({ cars }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <section className={styles.filter}>
        <input
          type="text"
          placeholder="Pesquise por termo, modelo, marca..."
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        />
      </section>

      <section className={styles.hero}>
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
    </>
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

import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { CarsCardSmall } from '../../components/CarsCardSmall';
import { SearchFilters } from '../../components/SearchFilters';
import styles from '../../styles/Inventory.module.scss';

export default function Inventory({ cars }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <section className={styles.search}>
        <input
          type="text"
          placeholder="Pesquise por termo, modelo, marca..."
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        />
      </section>

      <section className={styles.filters}>
        <div className={styles.filtersContainer}>
          <SearchFilters />
        </div>
      </section>

      <section className={styles.cards}>
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
    </div>
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

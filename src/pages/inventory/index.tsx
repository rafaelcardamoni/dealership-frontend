import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { CarsCardSmall } from '../../components/CarsCardSmall';
import { SearchBar } from '../../components/SearchBar';
import { SearchFilters } from '../../components/SearchFilters';
import styles from '../../styles/Inventory.module.scss';

export default function Inventory({ cars }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkboxFilter, setCheckboxFilter] = useState('');

  function handleSearchTerm(text) {
    setSearchTerm(text);
  }

  function handleCheckboxFilter(filter) {
    setCheckboxFilter(filter);
  }

  return (
    <div className={styles.container}>
      <section className={styles.search}>
        <div className={styles.searchbarContainer}>
          <SearchBar handleSearchTerm={handleSearchTerm} />
        </div>
      </section>

      <section className={styles.filters}>
        <div className={styles.filtersContainer}>
          <h3>Filtrar por</h3>
          <SearchFilters
            handleCheckboxFilter={handleCheckboxFilter}
            handleSearchTerm={handleSearchTerm}
          />
        </div>
      </section>

      <section className={styles.cards}>
        <div className={styles.grid}>
          {cars
            .filter(car => {
              if (checkboxFilter === '' && searchTerm === '') {
                return car;
              }
              if (checkboxFilter && searchTerm !== '') {
                if (
                  (car.make.includes(checkboxFilter) &&
                    (car.make.toLowerCase().includes(searchTerm) ||
                      car.model.toLowerCase().includes(searchTerm) ||
                      car.trim.toLowerCase().includes(searchTerm) ||
                      car.year.includes(searchTerm) ||
                      car.type.toLowerCase().includes(searchTerm) ||
                      car.color.toLowerCase().includes(searchTerm))) ||
                  `${car.make.toLowerCase()} ${car.model.toLowerCase()} ${car.trim.toLowerCase()}`.includes(
                    searchTerm
                  )
                ) {
                  return car;
                }
              } else if (checkboxFilter !== '') {
                if (car.make.includes(checkboxFilter)) {
                  return car;
                }
              } else if (
                (searchTerm !== '' &&
                  (car.make.toLowerCase().includes(searchTerm) ||
                    car.model.toLowerCase().includes(searchTerm) ||
                    car.trim.toLowerCase().includes(searchTerm) ||
                    car.year.toLowerCase().includes(searchTerm) ||
                    car.type.toLowerCase().includes(searchTerm) ||
                    car.color.toLowerCase().includes(searchTerm))) ||
                `${car.make.toLowerCase()} ${car.model.toLowerCase()} ${car.trim.toLowerCase()}`.includes(
                  searchTerm
                )
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
    },
    revalidate: 60 * 5 // 5 minutes in seconds
  };
};

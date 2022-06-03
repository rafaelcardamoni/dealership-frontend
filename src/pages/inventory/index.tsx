import { GetStaticProps } from 'next';
import { useState } from 'react';
import { CarsCardSmall } from '../../components/CarsCardSmall';
import { Loading } from '../../components/Loading';
import { SearchBar } from '../../components/SearchBar';
import { SearchFilters } from '../../components/SearchFilters';
import { getServerSideApi } from '../../services/serverSideApi';
import Head from 'next/head';
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
      <Head>
        <title>Estoque | dealership</title>
      </Head>

      <Loading />

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
                  car.make.includes(checkboxFilter) ||
                  car.model.includes(checkboxFilter) ||
                  car.type.includes(checkboxFilter) ||
                  car.color.includes(checkboxFilter) ||
                  car.transmission.includes(checkboxFilter) ||
                  (car.fuel.includes(checkboxFilter) &&
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
                if (
                  car.make.includes(checkboxFilter) ||
                  car.model.includes(checkboxFilter) ||
                  car.type.includes(checkboxFilter) ||
                  car.color.includes(checkboxFilter) ||
                  car.transmission.includes(checkboxFilter) ||
                  car.fuel.includes(checkboxFilter)
                ) {
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

export const getStaticProps: GetStaticProps = async ctx => {
  const serverSideApi = getServerSideApi(ctx);
  const cars = await serverSideApi
    .get(`/api/cars`)
    .then(response => response.data);

  return {
    props: {
      cars
    },
    revalidate: 60 * 5 // 5 minutes in seconds
  };
};

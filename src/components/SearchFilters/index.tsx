import { useContext } from 'react';
import { CarsContext } from '../../contexts/CarsContext';
import styles from './styles.module.scss';

export function SearchFilters() {
  const cars = useContext(CarsContext);

  const uniqueMakes = [...new Set(cars.map(car => car.make))];
  return (
    <div className={styles.container}>
      {uniqueMakes.map(make => {
        return (
          <slot key={make}>
            <input type="checkbox" name="make" value={make.toString()} />
            <label htmlFor="make">{make.toString()}</label>
          </slot>
        );
      })}
    </div>
  );
}

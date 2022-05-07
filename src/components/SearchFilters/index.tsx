import { useContext } from 'react';
import { CarsContext } from '../../contexts/CarsContext';
import styles from './styles.module.scss';

interface SearchFilterProps {
  handleCheckboxFilter: (filter: string) => void;
}

export function SearchFilters({ handleCheckboxFilter }: SearchFilterProps) {
  const cars = useContext(CarsContext);

  const uniqueMakes = [...new Set(cars.map(car => car.make))];
  return (
    <div className={styles.container}>
      {uniqueMakes.map(make => {
        return (
          <slot key={make} className={styles.slot}>
            <input
              type="checkbox"
              name="make"
              value={make.toString()}
              onChange={event => {
                if (event.target.checked === true) {
                  handleCheckboxFilter(event.target.value.toString());
                } else handleCheckboxFilter('');
              }}
            />
            <label htmlFor="make">{make.toString()}</label>
          </slot>
        );
      })}
    </div>
  );
}

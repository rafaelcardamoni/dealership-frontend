import { useContext, useState } from 'react';
import { CarsContext } from '../../contexts/CarsContext';
import { ResetInputButton } from '../ResetInputButton';
import styles from './styles.module.scss';

interface SearchFilterProps {
  handleCheckboxFilter: (filter: string) => void;
  handleSearchTerm: (text: string) => void;
}

export function SearchFilters({
  handleCheckboxFilter,
  handleSearchTerm
}: SearchFilterProps) {
  const cars = useContext(CarsContext);
  const uniqueMakes = [...new Set(cars.map(car => car.make))];
  const collection = new Map();

  cars.forEach(car => {
    if (!collection.has(car.make)) {
      collection.set(car.make, 0);
    }
    collection.set(car.make, collection.get(car.make) + 1);
  });

  return (
    <div className={styles.container}>
      <h4>Marcas</h4>

      <ResetInputButton
        handleCheckboxFilter={handleCheckboxFilter}
        handleSearchTerm={handleSearchTerm}
      />
      {uniqueMakes.map(make => {
        return (
          <slot key={make} className={styles.slot}>
            <input
              type="radio"
              name={'make'}
              value={make.toString()}
              onChange={event => {
                if (event.target.checked === true) {
                  handleCheckboxFilter(event.target.value.toString());
                } else handleCheckboxFilter('');
              }}
            />
            <label htmlFor="make">
              {make.toString()} {`(${collection.get(make.toString())})`}
            </label>
          </slot>
        );
      })}
    </div>
  );
}

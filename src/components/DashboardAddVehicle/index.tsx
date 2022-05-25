import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { clientSideApi } from '../../services/clientSideApi';
import { Button } from '../Button';
import { Input } from '../Form/Input';
import Select from '../Form/Select';
import styles from './styles.module.scss';

export function DashboardAddVehicle() {
  const router = useRouter();
  const [typeValue, setTypeValue] = useState<any>();

  const fuel = [
    { value: 'Gasolina', label: 'Gasolina' },
    { value: 'Flex', label: 'Flex' },
    { value: 'Elétrico', label: 'Elétrico' }
  ];

  const transmission = [
    { value: 'Manual', label: 'Manual' },
    { value: 'Automático', label: 'Automático' }
  ];

  const type = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Hatchback', label: 'Hatchback' },
    { value: 'Crossover', label: 'Crossover' },
    { value: 'Esportivo', label: 'Esportivo' },
    { value: 'Sedan Esportivo', label: 'Sedan Esportivo' },
    { value: 'Pickup', label: 'Pickup' }
  ];

  function handleSubmit(data) {
    clientSideApi
      .post('/api/cars/create', {
        make: data.make,
        model: data.model,
        trim: data.trim,
        year: data.year,
        mileage: data.mileage,
        transmission: data.transmission,
        engine: data.engine,
        power: data.power,
        type: data.type,
        fuel: data.fuel,
        city_consumption: data.city_consumption,
        road_consumption: data.road_consumption,
        range: data.range,
        color: data.color,
        price: data.price
      })
      .then(response => {
        console.log(response);
        router.reload();
      })
      .catch(error => console.log(error));
  }

  function handleSelectOptions(options) {
    setTypeValue(options.value);
  }

  return (
    <div className={styles.container}>
      <h2>Informações do veículo</h2>
      <Form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="make">Marca</label>
          <Input name="make" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="model">Modelo</label>
          <Input name="model" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="trim">Versão</label>
          <Input name="trim" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="year">Ano</label>
          <Input name="year" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="mileage">Quilometragem</label>
          <Input name="mileage" type="number" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="transmission">Transmissão</label>
          <Select
            name="transmission"
            placeholder="Selecionar..."
            options={transmission}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="engine">Motor</label>
          <Input name="engine" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="power">Potência</label>
          <Input name="power" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="type">Carroceria</label>
          <Select name="type" placeholder="Selecionar..." options={type} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="fuel">Combustível</label>
          <Select
            name="fuel"
            placeholder="Selecionar..."
            options={fuel}
            onChange={option => {
              handleSelectOptions(option);
            }}
          />
        </div>

        {typeValue === 'Gasolina' || typeValue === 'Flex' ? (
          <>
            <div className={styles.inputWrapper}>
              <label htmlFor="city_consumption">Consumo na cidade</label>
              <Input name="city_consumption" type="number" required />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="road_consumption">Consumo na estrada</label>
              <Input name="road_consumption" type="number" required />
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputWrapper}>
              <label htmlFor="range">Alcance</label>
              <Input name="range" type="number" required />
            </div>
          </>
        )}

        <div className={styles.inputWrapper}>
          <label htmlFor="color">Cor</label>
          <Input name="color" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="price">Preço</label>
          <Input name="price" type="number" required />
        </div>

        <div className={styles.buttons}>
          <Button
            hoverColorClass="textColorFilter"
            type="submit"
            text="Adicionar"
            backgroundColor="var(--sidebar)"
            shape="var(--rounded-3xl)"
            height="23px"
          />
        </div>
      </Form>
    </div>
  );
}

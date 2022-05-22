import { Form } from '@unform/web';
import { Input } from '../Form/Input';
import styles from './styles.module.scss';

export function DashboardAddVehicle() {
  function handleSubmit() {
    console.log('submit');
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="make">Marca</label>
          <Input name="make" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="model">Modelo</label>
          <Input name="model" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="trim">Versão</label>
          <Input name="trim" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="year">Ano</label>
          <Input name="year" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="mileage">Quilometragem</label>
          <Input name="mileage" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="engine">Motor</label>
          <Input name="engine" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="transmission">Transmissão</label>
          <Input name="transmission" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="power">Potência</label>
          <Input name="power" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="fuel">Combustível</label>
          <Input name="fuel" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="city_consumption">Consumo na cidade</label>
          <Input name="city_consumption" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="road_consumption">Consumo na estrada</label>
          <Input name="road_consumption" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="range">Alcance</label>
          <Input name="range" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="color">Cor</label>
          <Input name="color" />
        </div>
      </Form>
    </div>
  );
}

import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { CarsContext } from '../../contexts/CarsContext';
import { clientSideApi } from '../../services/clientSideApi';
import styles from './styles.module.scss';

export function DashboardAllVehicles() {
  const cars = useContext(CarsContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Versão</th>
            <th>Preço</th>
            <th>Data da inserção</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {cars.map(car => {
            return (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.trim}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(car.price)}
                </td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(car.created_at)
                  )}
                </td>
                <td>
                  <button type="submit" className={styles.edit}>
                    <AiOutlineEdit />
                  </button>
                </td>
                <td>
                  <button
                    className={styles.remove}
                    type="submit"
                    onClick={() => {
                      clientSideApi
                        .delete(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/delete/${car.id}`
                        )
                        .then(() => router.reload())
                        .catch(e => {
                          console.log(e.message);
                        });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <IoMdTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

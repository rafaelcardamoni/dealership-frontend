import { CarImageCarouselSmall } from '../CarImageCarouselSmall';
import styles from './styles.module.scss';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiGearStick } from 'react-icons/gi';
import { BiCalendar } from 'react-icons/bi';
import { VscGear } from 'react-icons/vsc';
import Link from 'next/link';

interface CardProps {
  car: {
    id: string;
    make: string;
    model: string;
    trim: string;
    year: string;
    price: number;
    mileage: number;
    engine: string;
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
  };
}

export function CarsCardSmall({ car }: CardProps) {
  return (
    <div className={styles.gridItem}>
      <div className={styles.carousel}>
        <CarImageCarouselSmall images={car.images} />
      </div>

      <Link href={`/cars/${car.id}`}>
        <a>
          <div className={styles.contentTop}>
            <h3>{`${car.make} ${car.model} ${car.trim}`}</h3>
          </div>

          <div className={styles.infoGrid}>
            <span>
              <i>
                <BiCalendar style={{ verticalAlign: 'middle' }} />
              </i>
              {` ${car.year}`}
            </span>
            <span>
              <i>
                <BsSpeedometer2 style={{ verticalAlign: 'middle' }} />
              </i>
              {` ${new Intl.NumberFormat().format(car.mileage)} km`}
            </span>
            <span>
              <VscGear style={{ verticalAlign: 'middle' }} />
              {` ${car.power} cv`}
            </span>
            <span>
              <i>
                <GiGearStick style={{ verticalAlign: 'middle' }} />
              </i>
              {` ${car.transmission}`}
            </span>
          </div>

          <section className={styles.contentBottom}>
            <h3>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(car.price)}
            </h3>
          </section>
        </a>
      </Link>
    </div>
  );
}

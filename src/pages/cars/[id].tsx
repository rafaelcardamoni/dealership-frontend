import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CarsCardSmall } from '../../components/CarsCardSmall';

export default function CarDetails({ data }) {
  return (
    <>
      {data.map(car => {
        return <h1 key={car.id}>{`${car.make} ${car.model}`}</h1>;
      })}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios
    .get(`${process.env.BASE_URL}/api/cars`)
    .then(response => response.data);

  const paths = response.map(car => {
    return {
      params: {
        id: car.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params.id;

  const data = await axios
    .get(`${process.env.BASE_URL}/api/car/${id}`)
    .then(response => response.data);

  return {
    props: {
      data
    }
  };
};

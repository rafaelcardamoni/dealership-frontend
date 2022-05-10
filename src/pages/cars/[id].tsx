import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { CarImageCarouselMain } from '../../components/CarImageCarouselMain';

interface CarProps {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: string;
  price: number;
  engine: string;
  mileage: number;
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
}

export default function CarDetails({ data }) {
  const [carInfo] = useState<CarProps[]>(data);
  const [imageData, setImageData] = useState<any>([]);

  useEffect(() => {
    carInfo.map(car => {
      setImageData(car.images);
    });
  }, []);

  return (
    <>
      <CarImageCarouselMain data={imageData} />
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

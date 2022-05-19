import { createContext, useState, useEffect, ReactNode } from 'react';
import { clientSideApi } from '../services/clientSideApi';

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
  range?: number;
  images: [
    {
      id: string;
      path: string;
    }
  ];
}

export const CarsContext = createContext([]);

interface CarsProviderProps {
  children: ReactNode;
}

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    clientSideApi
      .get(`/api/cars`)
      .then(response => response.data)
      .then(data => setCars(data));
  }, [cars]);

  return <CarsContext.Provider value={cars}>{children}</CarsContext.Provider>;
};

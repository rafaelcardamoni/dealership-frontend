import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function CarDetails() {
  return <h1>hello world</h1>;
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await axios
//     .get(`${process.env.BASE_URL}/api/cars`)
//     .then(response => response.data);

//   const paths = response.map(car => {
//     return {
//       params: {
//         id: car.id.toString()
//       }
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false
//   };
// };

// export const getStaticProps: GetStaticProps = async context => {
//   const id = context.params.id;

//   const data = await axios
//     .get(`${process.env.BASE_URL}/api/car/${id}`)
//     .then(response => response.data);

//   return {
//     props: {
//       data
//     }
//   };
// };

import { parseCookies } from 'nookies';
import axios from 'axios';

export function getServerSideApi(ctx?: any) {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

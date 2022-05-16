import { parseCookies } from 'nookies';
import axios from 'axios';
import * as next from 'next';
import * as cookie from 'cookie';

export function getServerSideApi(
  ctx?:
    | Pick<next.NextPageContext, 'req'>
    | {
        req: next.NextApiRequest;
      }
    | null
    | undefined,
  options?: cookie.CookieParseOptions
) {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

import { client } from '$services/redis';
import { pageChacheKey } from '$services/keys';

const cacheRoutes = [
  '/about', '/privacy', '/auth/signin', '/auth/signup'
];

export const getCachedPage = (route: string) => {
  if (cacheRoutes.includes(route)) {
    return client.get(pageChacheKey(route));
  }

  return null;
};

export const setCachedPage = (route: string, page: string) => {
  if (cacheRoutes.includes(route)) {
    return client.set(pageChacheKey(route), page, {
      EX: 2
    });
  }
};

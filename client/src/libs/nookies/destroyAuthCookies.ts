import { destroyCookie } from 'nookies';

export const destroyAuthCookies = () => {
  destroyCookie(null, 'access-token');
  destroyCookie(null, 'uid');
  destroyCookie(null, 'client');
};

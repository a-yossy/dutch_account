import { destroyCookie } from 'nookies';

const destroyAuthCookies = () => {
  destroyCookie(null, 'access-token');
  destroyCookie(null, 'uid');
  destroyCookie(null, 'client');
};

export default destroyAuthCookies;

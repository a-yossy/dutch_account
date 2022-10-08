import { parseCookies } from 'nookies';

const getAuthCookies = () => {
  const cookies = parseCookies();

  return {
    'access-token': cookies['access-token'],
    uid: cookies.uid,
    client: cookies.client,
  };
};

export default getAuthCookies;

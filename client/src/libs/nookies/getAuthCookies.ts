import { parseCookies } from 'nookies';

export const getAuthCookies = () => {
  const cookies = parseCookies();

  return {
    'access-token': cookies['access-token'],
    uid: cookies.uid,
    client: cookies.client,
  };
};

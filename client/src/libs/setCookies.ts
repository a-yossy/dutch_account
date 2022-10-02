import { AxiosResponseHeaders } from 'axios';
import { setCookie } from 'nookies';

const setCookies = (headers: AxiosResponseHeaders) => {
  setCookie(null, 'access-token', headers['access-token']);
  setCookie(null, 'uid', headers.uid);
  setCookie(null, 'client', headers.client);
};

export default setCookies;

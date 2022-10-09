import { atom } from 'recoil';
import { User } from 'openapi-generator/api';

const currentUserState = atom<undefined | null | User>({
  key: 'currentUserState',
  default: undefined,
});

export default currentUserState;

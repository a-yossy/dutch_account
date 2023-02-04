import { CurrentUserState } from 'src/recoil/currentUserState';

export const currentUserStateWithLoading: CurrentUserState = {
  state: 'loading',
};

export const currentUserStateWithLogIn: CurrentUserState = {
  state: 'log_in',
  data: {
    id: '1',
    name: '太郎',
  },
};

export const currentUserStateWithLogOut: CurrentUserState = {
  state: 'log_out',
};

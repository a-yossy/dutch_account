import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from 'src/openapi-generator';
import { RecoilAtomKeys } from 'src/recoil/keys';

export type CurrentUserState =
  | {
      state: 'loading';
    }
  | {
      state: 'log_in';
      data: User;
    }
  | {
      state: 'log_out';
    };

const currentUserState = atom<CurrentUserState>({
  key: RecoilAtomKeys.CURRENT_USER_STATE,
  default: { state: 'loading' },
});

export const useGetCurrentUser = () => {
  const currentUser = useRecoilValue(currentUserState);

  return currentUser;
};

export const useSetCurrentUser = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  return setCurrentUser;
};

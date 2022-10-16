import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from 'openapi-generator/api';
import RecoilAtomKeys from 'src/recoil/keys';

type CurrentUserState =
  | {
      state: 'loading';
    }
  | {
      state: 'sign_in';
      data: User;
    }
  | {
      state: 'sign_out';
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

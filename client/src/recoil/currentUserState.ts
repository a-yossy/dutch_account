import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from 'openapi-generator/api';
import RecoilAtomKeys from 'src/recoil/keys';

const currentUserState = atom<undefined | null | User>({
  key: RecoilAtomKeys.CURRENT_USER_STATE,
  default: undefined,
});

export const useGetCurrentUser = () => {
  const currentUser = useRecoilValue(currentUserState);

  return currentUser;
};

export const useSetCurrentUser = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  return setCurrentUser;
};

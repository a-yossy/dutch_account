import { useRecoilValue } from 'recoil';
import currentUserState from 'src/libs/currentUserState';

const useCurrentUser = () => {
  const currentUser = useRecoilValue(currentUserState);

  return currentUser;
};

export default useCurrentUser;

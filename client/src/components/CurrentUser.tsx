import { FC, useEffect } from 'react';
import { UserApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { useSetCurrentUser } from 'src/recoil/currentUserState';

export const CurrentUser: FC = () => {
  const setUser = useSetCurrentUser();
  const cookies = getAuthCookies();

  useEffect(() => {
    const setCurrentUser = async () => {
      try {
        const res = await new UserApi().getCurrentUser({
          headers: cookies,
        });
        setUser({ state: 'log_in', data: res.data });
      } catch {
        setUser({ state: 'log_out' });
      }
    };
    void setCurrentUser();
    // typeof cookies === object が原因で無限レンダリングが起こるため依存配列のESLintを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, cookies.uid, cookies.client, cookies['access-token']]);

  return null;
};

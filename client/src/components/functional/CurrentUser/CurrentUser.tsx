import { FC, useEffect } from 'react';
import { UserApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { useSetCurrentUser } from 'src/recoil/currentUserState';
import { useSetCurrentManagementGroup } from 'src/recoil/currentManagementGroupState';

export const CurrentUser: FC = () => {
  const setUser = useSetCurrentUser();
  const setCurrentManagementGroup = useSetCurrentManagementGroup();
  const cookies = getAuthCookies();

  useEffect(() => {
    let ignore = false;
    const setCurrentUser = async () => {
      try {
        const res = await new UserApi().getCurrentUser({
          headers: cookies,
        });
        if (!ignore) {
          setUser({ state: 'log_in', data: res.data });
        }
      } catch {
        if (!ignore) {
          setUser({ state: 'log_out' });
          setCurrentManagementGroup({ state: 'not_existence' });
        }
      }
    };
    void setCurrentUser();

    return () => {
      ignore = true;
    };
    // typeof cookies === object が原因で無限レンダリングが起こるため依存配列のESLintを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, cookies.uid, cookies.client, cookies['access-token']]);

  return null;
};

import { screen, render, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { setUpFakeServer } from 'src/utils/test/setUpFakeServer';
import ManagementGroupPage from 'src/pages/management_groups/[management_group_id]';
import {
  getManagementGroupHandler,
  getManagementGroupHandlerWithNotFoundError,
} from 'src/test/server/handlers/managementGroup';
import { getManagementGroupResponse } from 'src/__fixtures__/managementGroup';
import {
  getManagementGroupUsersHandler,
  getManagementGroupUsersHandlerWithNouFoundError,
} from 'src/test/server/handlers/user';
import { getManagementGroupPaymentGroupsHandler } from 'src/test/server/handlers/paymentGroup';

const { server } = setUpFakeServer([
  getManagementGroupHandler(),
  getManagementGroupUsersHandler(),
  getManagementGroupPaymentGroupsHandler(),
]);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { management_group_id: '1' },
    };
  },
}));

describe('管理グループ詳細ページ', () => {
  it('IDが文字列以外の場合はスピナーが表示されること', () => {
    jest.mock('next/router', () => ({
      useRouter() {
        return {
          query: { management_group_id: 1 },
        };
      },
    }));
    const { baseElement } = render(<ManagementGroupPage />);
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
  });

  it('管理グループを取得できない時は404エラーページが表示されること', async () => {
    server.use(getManagementGroupHandlerWithNotFoundError());
    const { baseElement } = render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ManagementGroupPage />)
      </SWRConfig>
    );
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
    await waitFor(() => {
      expect(screen.getByText('ページが見つかりません')).toBeInTheDocument();
    });
  });

  it('管理グループが存在する時は管理グループ名が表示されること', async () => {
    server.use(getManagementGroupHandler());
    const { baseElement } = render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ManagementGroupPage />)
      </SWRConfig>
    );
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
    await waitFor(() => {
      expect(
        screen.getByText(`管理グループ：${getManagementGroupResponse.name}`)
      ).toBeInTheDocument();
    });
  });

  it('ユーザーを取得できない時は404エラーページが表示されること', async () => {
    server.use(getManagementGroupUsersHandlerWithNouFoundError());
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ManagementGroupPage />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(screen.getByText('ユーザーが見つかりません')).toBeInTheDocument();
    });
  });
});

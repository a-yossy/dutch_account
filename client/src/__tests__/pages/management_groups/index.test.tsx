import { screen, render, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { setUpFakeServer } from 'src/utils/test/setUpFakeServer';
import ManagementGroupsPage from 'src/pages/management_groups';
import {
  getManagementGroupsHandler,
  getNoManagementGroupsHandler,
} from 'src/test/server/handlers/managementGroup';
import { getManagementGroupsResponse } from 'src/__fixtures__/managementGroup';

const { server } = setUpFakeServer([getManagementGroupsHandler()]);

describe('管理グループ一覧ページ', () => {
  it('管理グループが0個の時はその趣旨が表示されること', async () => {
    server.use(getNoManagementGroupsHandler());
    const { baseElement } = render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ManagementGroupsPage />
      </SWRConfig>
    );
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
    await waitFor(() =>
      expect(screen.getByText('グループが存在しません')).toBeInTheDocument()
    );
  });

  it('管理グループが存在する時は管理グループ名が表示されること', async () => {
    const { baseElement } = render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ManagementGroupsPage />
      </SWRConfig>
    );
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
    await waitFor(() =>
      expect(
        screen.getByRole('link', {
          name: getManagementGroupsResponse[0].name,
        })
      ).toHaveAttribute(
        'href',
        `/management_groups/${getManagementGroupsResponse[0].id}`
      )
    );
  });
});

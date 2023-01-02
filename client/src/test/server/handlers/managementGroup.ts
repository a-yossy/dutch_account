import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

const tmp = [
  { id: '1', name: 'group1' },
  { id: '2', name: 'group2' },
];

export const getManagementGroupsHandler = () =>
  rest.get(`${BASE_PATH}/management_groups`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(tmp))
  );

const tmp2 = [
  { id: '1', name: 'name1' },
  { id: '2', name: 'name2' },
];

export const getManagementGroupUsersHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/users`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(tmp2))
  );

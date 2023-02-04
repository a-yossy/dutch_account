import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import { getManagementGroupUsersResponse } from 'src/__fixtures__/user';

export const getManagementGroupUsersHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/users`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getManagementGroupUsersResponse))
  );

export const getManagementGroupUsersHandlerWithNouFoundError = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/users`,
    (req, res, ctx) => res(ctx.status(404))
  );

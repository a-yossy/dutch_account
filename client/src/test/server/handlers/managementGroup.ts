import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  getManagementGroupsResponse,
  getManagementGroupUsersResponse,
} from 'src/__fixtures__/managementGroup';

export const getManagementGroupsHandler = () =>
  rest.get(`${BASE_PATH}/management_groups`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getManagementGroupsResponse))
  );

export const getManagementGroupUsersHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/users`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getManagementGroupUsersResponse))
  );

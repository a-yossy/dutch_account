import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  getManagementGroupResponse,
  getManagementGroupsResponse,
} from 'src/__fixtures__/managementGroup';

export const getManagementGroupsHandler = () =>
  rest.get(`${BASE_PATH}/management_groups`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getManagementGroupsResponse))
  );

export const getNoManagementGroupsHandler = () =>
  rest.get(`${BASE_PATH}/management_groups`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json([]))
  );

export const getManagementGroupHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getManagementGroupResponse))
  );

export const getManagementGroupHandlerWithNotFoundError = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id`,
    (req, res, ctx) => res(ctx.status(404))
  );

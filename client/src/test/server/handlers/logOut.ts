import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

export const logOutHandler = () =>
  rest.delete(`${BASE_PATH}/log_out`, (req, res, ctx) => res(ctx.status(204)));

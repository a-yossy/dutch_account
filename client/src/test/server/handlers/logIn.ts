import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import { logInResponse } from 'src/__fixtures__/logIn';

export const logInHandler = () =>
  rest.post(`${BASE_PATH}/log_in`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(logInResponse))
  );

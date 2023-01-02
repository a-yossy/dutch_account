import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

const tmp = {
  id: '1',
  name: '太郎',
};

export const logInHandler = () =>
  rest.post(`${BASE_PATH}/log_in`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(tmp))
  );

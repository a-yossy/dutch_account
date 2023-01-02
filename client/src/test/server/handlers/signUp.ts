import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

const tmp = {
  id: '1',
  name: '太郎',
};

export const signUpHandler = () =>
  rest.post(`${BASE_PATH}/sign_up`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(tmp))
  );

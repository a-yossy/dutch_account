import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import { signUpResponse } from 'src/__fixtures__/signUp';

export const signUpHandler = () =>
  rest.post(`${BASE_PATH}/sign_up`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(signUpResponse))
  );

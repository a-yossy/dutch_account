import { setupServer } from 'msw/node';

export const setUpFakeServer = (args?: Parameters<typeof setupServer>) => {
  const server = args ? setupServer(...args) : setupServer();

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  return { server };
};

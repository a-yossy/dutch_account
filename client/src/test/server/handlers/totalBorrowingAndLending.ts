import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import { getManagementGroupTotalBorrowingAndLendingsResponse } from 'src/__fixtures__/totalBorrowingAndLending';

export const getManagementGroupTotalBorrowingAndLendingsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/total_borrowing_and_lendings`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(getManagementGroupTotalBorrowingAndLendingsResponse)
      )
  );

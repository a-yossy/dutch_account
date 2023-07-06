import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import {
  TotalBorrowingAndLending,
  TotalBorrowingAndLendingApi,
} from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetManagementGroupTotalBorrowingAndLendings = (
  managementGroupId: string
) => {
  const fetcher = () =>
    new TotalBorrowingAndLendingApi()
      .getTotalBorrowingAndLendingByManagementGroupId(managementGroupId, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);
  const { data, error } = useSWR<
    TotalBorrowingAndLending[],
    AxiosResponseError
  >(
    `api/v1/management_groups/${managementGroupId}/total_borrowing_and_lendings`,
    fetcher
  );

  return { managementGroupTotalBorrowingAndLendings: data, error };
};

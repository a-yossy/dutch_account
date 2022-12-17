import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/features/payment_groups/api/getPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';
import { CenterTitle } from 'src/components/elements';
import { PaymentGroupUsersList } from 'src/features/payment_groups/components/PaymentGroupUsersList';

type PaymentGroupProps = {
  managementGroupId: string;
  paymentGroupId: string;
};
export const PaymentGroup: FC<PaymentGroupProps> = ({
  managementGroupId,
  paymentGroupId,
}) => {
  const { paymentGroup, error } = useGetPaymentGroup(
    managementGroupId,
    paymentGroupId
  );

  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  if (!paymentGroup) return <Spinner />;

  return (
    <>
      <CenterTitle>支払グループ：{paymentGroup.name}</CenterTitle>
      <PaymentGroupUsersList
        managementGroupId={managementGroupId}
        paymentGroupId={paymentGroupId}
      />
    </>
  );
};

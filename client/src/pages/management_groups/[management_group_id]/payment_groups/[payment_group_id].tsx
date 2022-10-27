import { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner, Text } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/hooks/useGetPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';

const PaymentGroupPage: NextPage = () => {
  const router = useRouter();
  const {
    management_group_id: managementGroupId,
    payment_group_id: paymentGroupId,
  } = router.query;

  if (
    typeof managementGroupId !== 'string' ||
    typeof paymentGroupId !== 'string'
  )
    return <Spinner />;

  return (
    <PaymentGroup
      managementGroupId={managementGroupId}
      paymentGroupId={paymentGroupId}
    />
  );
};

export default PaymentGroupPage;

type PaymentGroupProps = {
  managementGroupId: string;
  paymentGroupId: string;
};

const PaymentGroup: FC<PaymentGroupProps> = ({
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
    <Text fontSize='xl' align='center'>
      支払グループ：{paymentGroup.name}
    </Text>
  );
};

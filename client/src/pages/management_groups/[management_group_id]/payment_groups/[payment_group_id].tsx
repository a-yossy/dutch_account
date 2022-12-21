import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { PaymentGroup } from 'src/features/payment_groups';

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

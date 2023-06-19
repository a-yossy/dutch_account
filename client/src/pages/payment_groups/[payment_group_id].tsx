import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { PaymentGroup } from 'src/features/payment_groups';

const PaymentGroupPage: NextPage = () => {
  const router = useRouter();
  const { payment_group_id: paymentGroupId } = router.query;

  if (typeof paymentGroupId !== 'string') return <Spinner />;

  return <PaymentGroup paymentGroupId={paymentGroupId} />;
};

export default PaymentGroupPage;

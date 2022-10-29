import { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner, Text, Box } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/hooks/useGetPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';
import { useGetPaymentAffiliations } from 'src/hooks/useGetPaymentAffiliations';

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
  const { paymentGroup, error: paymentGroupError } = useGetPaymentGroup(
    managementGroupId,
    paymentGroupId
  );
  const { paymentAffiliations, error: paymentAffiliationsError } =
    useGetPaymentAffiliations(managementGroupId, paymentGroup?.id);

  if (
    paymentGroupError?.response?.status === 404 ||
    paymentAffiliationsError?.response?.status === 404
  )
    return <NotFoundErrorPage />;

  if (!paymentGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        支払グループ：{paymentGroup.name}
      </Text>
      {paymentAffiliations === undefined ? (
        <Spinner />
      ) : (
        paymentAffiliations.map((paymentAffiliation) => (
          <Box
            key={paymentAffiliation.user.id}
            width={400}
            mx='auto'
            boxShadow='dark-lg'
            rounded='md'
            bg='#164b9f1b'
            height={12}
            display='flex'
            alignItems='center'
            pl={3}
            mt={5}
          >
            {paymentAffiliation.user.name}
          </Box>
        ))
      )}
    </>
  );
};

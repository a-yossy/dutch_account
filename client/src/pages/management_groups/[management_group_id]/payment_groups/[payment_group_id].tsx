import { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner, Text, Box } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/hooks/useGetPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';
import { useGetPaymentAffiliationUsers } from 'src/hooks/useGetPaymentAffiliationUsers';

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
  const { paymentAffiliationUsers, error: paymentAffiliationUsersError } =
    useGetPaymentAffiliationUsers(managementGroupId, paymentGroup?.id);

  if (
    paymentGroupError?.response?.status === 404 ||
    paymentAffiliationUsersError?.response?.status === 404
  )
    return <NotFoundErrorPage />;

  if (!paymentGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        支払グループ：{paymentGroup.name}
      </Text>
      {paymentAffiliationUsers === undefined ? (
        <Spinner />
      ) : (
        paymentAffiliationUsers.map((paymentAffiliationUser) => (
          <Box
            key={paymentAffiliationUser.id}
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
            {paymentAffiliationUser.name}
          </Box>
        ))
      )}
    </>
  );
};

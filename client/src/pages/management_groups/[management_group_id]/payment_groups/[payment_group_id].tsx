import { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner, Badge, Spacer } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/features/management_groups/[management_group_id]/payment_groups/[payment_group_id]/hooks/useGetPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';
import { useGetPaymentAffiliations } from 'src/features/management_groups/[management_group_id]/payment_groups/[payment_group_id]/hooks/useGetPaymentAffiliations';
import { OneLineCard, Title } from 'src/components/elements';

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
      <Title>支払グループ：{paymentGroup.name}</Title>
      {paymentAffiliations === undefined ? (
        <Spinner />
      ) : (
        paymentAffiliations.map((paymentAffiliation) => (
          <OneLineCard
            key={paymentAffiliation.user.id}
            mx='auto'
            bg='#164b9f1b'
            pl={3}
            pr={3}
            mt={5}
          >
            {paymentAffiliation.user.name}
            <Spacer />
            <Badge>{paymentAffiliation.ratio}</Badge>
          </OneLineCard>
        ))
      )}
    </>
  );
};

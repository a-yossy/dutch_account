import { FC } from 'react';
import { Spinner, Badge, Spacer } from '@chakra-ui/react';
import { useGetPaymentGroupPaymentAffiliations } from 'src/features/payment_groups/api/getPaymentGroupPaymentAffiliations';
import { CenterTitle, OneLineCard } from 'src/components/elements';

type PaymentGroupPaymentAffiliationsListProps = {
  managementGroupId: string;
  paymentGroupId: string;
};

export const PaymentGroupPaymentAffiliationsList: FC<
  PaymentGroupPaymentAffiliationsListProps
> = ({ managementGroupId, paymentGroupId }) => {
  const { paymentGroupPaymentAffiliations, error } =
    useGetPaymentGroupPaymentAffiliations(managementGroupId, paymentGroupId);

  if (error?.response?.status === 404)
    return <CenterTitle mt={5}>ユーザーが見つかりません</CenterTitle>;

  return (
    <div>
      {paymentGroupPaymentAffiliations === undefined ? (
        <Spinner />
      ) : (
        paymentGroupPaymentAffiliations.map(
          (paymentGroupPaymentAffiliation) => (
            <OneLineCard
              key={paymentGroupPaymentAffiliation.user.id}
              mx='auto'
              bg='#164b9f1b'
              boxShadow='dark-lg'
              rounded='md'
              height={12}
              width={400}
              pl={3}
              pr={3}
              mt={5}
            >
              {paymentGroupPaymentAffiliation.user.name}
              <Spacer />
              <Badge>{paymentGroupPaymentAffiliation.ratio}</Badge>
            </OneLineCard>
          )
        )
      )}
    </div>
  );
};

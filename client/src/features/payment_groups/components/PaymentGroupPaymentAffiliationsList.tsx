import { FC } from 'react';
import { Spinner, Badge, Spacer, Box } from '@chakra-ui/react';
import { useGetPaymentGroupPaymentAffiliations } from 'src/features/payment_groups/api/getPaymentGroupPaymentAffiliations';
import { CenterTitle } from 'src/components/elements';
import { ManagementGroup, PaymentGroup } from 'src/openapi-generator';

type PaymentGroupPaymentAffiliationsListProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
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
            <Box
              display='flex'
              alignItems='center'
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
            </Box>
          )
        )
      )}
    </div>
  );
};

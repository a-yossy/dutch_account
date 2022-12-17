import { FC } from 'react';
import { Spinner, Badge, Spacer } from '@chakra-ui/react';
import NotFoundErrorPage from 'src/pages/404';
import { useGetPaymentGroupUsers } from 'src/features/payment_groups/api/getPaymentGroupUsers';
import { OneLineCard } from 'src/components/elements';

type PaymentGroupUsersListProps = {
  managementGroupId: string;
  paymentGroupId: string;
};

export const PaymentGroupUsersList: FC<PaymentGroupUsersListProps> = ({
  managementGroupId,
  paymentGroupId,
}) => {
  const { paymentGroupUsers, error } = useGetPaymentGroupUsers(
    managementGroupId,
    paymentGroupId
  );

  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  return (
    <div>
      {paymentGroupUsers === undefined ? (
        <Spinner />
      ) : (
        paymentGroupUsers.map((paymentGroupUser) => (
          <OneLineCard
            key={paymentGroupUser.user.id}
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
            {paymentGroupUser.user.name}
            <Spacer />
            <Badge>{paymentGroupUser.ratio}</Badge>
          </OneLineCard>
        ))
      )}
    </div>
  );
};

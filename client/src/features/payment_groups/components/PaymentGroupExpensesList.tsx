import { FC } from 'react';
import { PaymentGroup, ManagementGroup } from 'src/openapi-generator';
import { useGetPaymentGroupExpenses } from 'src/features/payment_groups/api/getPaymentGroupExpenses';
import { CenterTitle, NoDecorationLink } from 'src/components/elements';
import { Spinner } from '@chakra-ui/react';
import dayjs from 'dayjs';

type PaymentGroupExpensesListProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const PaymentGroupExpensesList: FC<PaymentGroupExpensesListProps> = ({
  paymentGroupId,
  managementGroupId,
}) => {
  const { paymentGroupExpenses, error } = useGetPaymentGroupExpenses(
    managementGroupId,
    paymentGroupId
  );

  if (error?.response?.status === 404)
    return <CenterTitle mt={5}>費用が見つかりません</CenterTitle>;

  return (
    <div>
      {paymentGroupExpenses === undefined && <Spinner />}
      {paymentGroupExpenses !== undefined &&
        (paymentGroupExpenses.length === 0 ? (
          <CenterTitle mt={5}>費用が存在しません</CenterTitle>
        ) : (
          paymentGroupExpenses.map((paymentGroupExpense) => (
            <NoDecorationLink
              display='block'
              key={paymentGroupExpense.id}
              href={`/payment_groups/${paymentGroupId}/expenses/${paymentGroupExpense.id}`}
              mx='auto'
              bg='#164b9f1b'
              boxShadow='dark-lg'
              rounded='md'
              width={400}
              mt={5}
              pl={3}
              py={2}
            >
              {paymentGroupExpense.description}
              <br />
              <br />
              支払ったユーザー: {paymentGroupExpense.user.name}
              <br />
              金額: {paymentGroupExpense.amount_of_money.toLocaleString()}円
              <br />
              支払日:{' '}
              {dayjs(new Date(paymentGroupExpense.paid_on)).format(
                'YYYY/MM/DD'
              )}
            </NoDecorationLink>
          ))
        ))}
    </div>
  );
};

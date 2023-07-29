import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { Expense as ExpenseComponent } from 'src/features/expenses/components/Expense';
import { useGetCurrentManagementGroup } from 'src/recoil/currentManagementGroupState';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import { Spinner, Center, HStack } from '@chakra-ui/react';
import NotFoundErrorPage from 'src/pages/404';
import { ExpenseEditModalForm } from 'src/features/expenses/components/ExpenseEditModalForm';
import { ExpenseDeleteDialog } from 'src/features/expenses/components/ExpenseDeleteDialog';

type ExpenseProps = {
  paymentGroupId: string;
  expenseId: string;
};

export const Expense: FC<ExpenseProps> = ({ paymentGroupId, expenseId }) => {
  const currentUser = useGetCurrentUser();
  const currentManagementGroup = useGetCurrentManagementGroup();

  if (currentUser.state === 'loading') return <Spinner />;
  if (currentUser.state === 'log_out') return <NotFoundErrorPage />;
  if (currentManagementGroup.state === 'not_existence')
    return <CenterTitle>管理グループを選択してください</CenterTitle>;

  return (
    <>
      <CenterTitle>費用</CenterTitle>
      <Center mt={5}>
        <HStack>
          <ExpenseEditModalForm
            managementGroupId={currentManagementGroup.data.id}
            paymentGroupId={paymentGroupId}
            expenseId={expenseId}
          />
          <ExpenseDeleteDialog
            managementGroupId={currentManagementGroup.data.id}
            paymentGroupId={paymentGroupId}
            expenseId={expenseId}
          />
        </HStack>
      </Center>
      <ExpenseComponent
        managementGroupId={currentManagementGroup.data.id}
        paymentGroupId={paymentGroupId}
        expenseId={expenseId}
      />
    </>
  );
};

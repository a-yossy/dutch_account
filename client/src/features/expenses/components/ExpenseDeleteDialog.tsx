import { FC, useRef } from 'react';
import { ManagementGroup, PaymentGroup, Expense } from 'src/openapi-generator';
import { useDeleteExpense } from 'src/features/expenses/api/deleteExpense';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { OutlineButton } from 'src/components/elements';

type ExpenseDeleteDialogProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
  expenseId: Expense['id'];
};

export const ExpenseDeleteDialog: FC<ExpenseDeleteDialogProps> = ({
  managementGroupId,
  paymentGroupId,
  expenseId,
}) => {
  const deleteExpense = useDeleteExpense(
    managementGroupId,
    paymentGroupId,
    expenseId
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <>
      <OutlineButton onClick={onOpen} colorScheme='red'>
        削除
      </OutlineButton>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>費用削除</AlertDialogHeader>
            <AlertDialogBody>本当に削除しますか？</AlertDialogBody>
            <AlertDialogFooter>
              <OutlineButton onClick={onClose} ref={cancelRef}>
                キャンセル
              </OutlineButton>
              <OutlineButton colorScheme='red' onClick={deleteExpense} ml={3}>
                削除
              </OutlineButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

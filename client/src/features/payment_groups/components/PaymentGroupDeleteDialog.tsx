import { FC, useRef } from 'react';
import { ManagementGroup, PaymentGroup } from 'src/openapi-generator';
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { OutlineButton } from 'src/components/elements';
import { useDeletePaymentGroup } from 'src/features/payment_groups/api/deletePaymentGroup';
import { useGetPaymentGroupExpenses } from '../api/getPaymentGroupExpenses';

type PaymentGroupDeleteDialogProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const PaymentGroupDeleteDialog: FC<PaymentGroupDeleteDialogProps> = ({
  managementGroupId,
  paymentGroupId,
}) => {
  const { paymentGroupExpenses, error } = useGetPaymentGroupExpenses(
    managementGroupId,
    paymentGroupId
  );
  const deletePaymentGroup = useDeletePaymentGroup(
    managementGroupId,
    paymentGroupId
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const handleClick = () => {
    void deletePaymentGroup();
    onClose();
  };

  if (error?.response?.status === 404) {
    return null;
  }

  return (
    <>
      <OutlineButton
        onClick={onOpen}
        colorScheme='red'
        isLoading={paymentGroupExpenses === undefined}
        isDisabled={paymentGroupExpenses?.length !== 0}
      >
        削除
      </OutlineButton>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>支払グループ削除</AlertDialogHeader>
            <AlertDialogBody>本当に削除しますか？</AlertDialogBody>
            <AlertDialogFooter>
              <OutlineButton onClick={onClose} ref={cancelRef}>
                キャンセル
              </OutlineButton>
              <OutlineButton colorScheme='red' onClick={handleClick} ml={3}>
                削除
              </OutlineButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

import { FC, useRef } from 'react';
import { ManagementGroup } from 'src/openapi-generator';
import { useMarkDebtRecordsAsPaid } from 'src/features/debt_records/api/markDebtRecordsAsPaid';
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
import { useGetManagementGroupTotalBorrowingAndLendings } from 'src/features/management_groups/api/getManagementGroupTotalBorrowingAndLendings';

type MarkDebtRecordsAsPaidDialogProps = {
  managementGroupId: ManagementGroup['id'];
};

export const MarkDebtRecordsAsPaidDialog: FC<
  MarkDebtRecordsAsPaidDialogProps
> = ({ managementGroupId }) => {
  const { managementGroupTotalBorrowingAndLendings, error } =
    useGetManagementGroupTotalBorrowingAndLendings(managementGroupId);
  const markDebtRecordsAsPaid = useMarkDebtRecordsAsPaid(managementGroupId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleClick = () => {
    void markDebtRecordsAsPaid();
    onClose();
  };

  if (error?.response?.status === 404) {
    return <>総貸借が見つかりません</>;
  }

  return (
    <>
      <OutlineButton
        colorScheme='green'
        onClick={onOpen}
        isLoading={managementGroupTotalBorrowingAndLendings === undefined}
        isDisabled={
          managementGroupTotalBorrowingAndLendings?.filter(
            (managementGroupTotalBorrowingAndLending) =>
              managementGroupTotalBorrowingAndLending.amount_of_money !== 0
          ).length === 0
        }
      >
        支払完了
      </OutlineButton>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>支払完了</AlertDialogHeader>
            <AlertDialogBody>本当に支払完了にしますか？</AlertDialogBody>
            <AlertDialogFooter>
              <OutlineButton onClick={onClose} ref={cancelRef}>
                キャンセル
              </OutlineButton>
              <OutlineButton colorScheme='green' onClick={handleClick} ml={3}>
                完了
              </OutlineButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

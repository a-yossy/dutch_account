import { FC } from 'react';
import { Center, HStack, Spinner } from '@chakra-ui/react';
import { useGetPaymentGroup } from 'src/features/payment_groups/api/getPaymentGroup';
import NotFoundErrorPage from 'src/pages/404';
import { CenterTitle } from 'src/components/elements';
import { PaymentGroupTab } from 'src/features/payment_groups/components/PaymentGroupTab';
import { useGetCurrentManagementGroup } from 'src/recoil/currentManagementGroupState';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import { PaymentGroupDeleteDialog } from 'src/features/payment_groups/components/PaymentGroupDeleteDialog';
import { PaymentRelationEditModalForm } from 'src/features/payment_relations/components/PaymentRelationEditModalForm';

type PaymentGroupProps = {
  paymentGroupId: string;
};

export const PaymentGroup: FC<PaymentGroupProps> = ({ paymentGroupId }) => {
  const currentUser = useGetCurrentUser();
  const currentManagementGroup = useGetCurrentManagementGroup();
  const { paymentGroup, error } = useGetPaymentGroup(
    currentManagementGroup.state === 'existence'
      ? currentManagementGroup.data.id
      : undefined,
    paymentGroupId
  );

  if (currentUser.state === 'loading') return <Spinner />;
  if (currentUser.state === 'log_out') return <NotFoundErrorPage />;
  if (currentManagementGroup.state === 'not_existence')
    return <CenterTitle>管理グループを選択してください</CenterTitle>;
  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  if (!paymentGroup) return <Spinner />;

  return (
    <>
      <CenterTitle>支払グループ：{paymentGroup.name}</CenterTitle>
      <Center mt={5}>
        <HStack>
          <PaymentRelationEditModalForm
            managementGroupId={currentManagementGroup.data.id}
            paymentGroupId={paymentGroup.id}
          />
          <PaymentGroupDeleteDialog
            managementGroupId={currentManagementGroup.data.id}
            paymentGroupId={paymentGroup.id}
          />
        </HStack>
      </Center>
      <PaymentGroupTab
        managementGroupId={currentManagementGroup.data.id}
        paymentGroupId={paymentGroup.id}
      />
    </>
  );
};

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from '@chakra-ui/react';
import { FC } from 'react';
import { OutlineButton } from 'src/components/elements';
import { Form, InputField } from 'src/components/parts';
import {
  ManagementGroup,
  PaymentGroup,
  UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest,
} from 'src/openapi-generator';
import { useGetPaymentGroup } from '../api/getPaymentGroup';
import { useUpdatePaymentGroup } from '../api/updatePaymentGroup';
import { UpdatePaymentGroupSchema } from '../formSchemas/updatePaymentGroupSchema';

type PaymentGroupEditModalProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const PaymentGroupEditModal: FC<PaymentGroupEditModalProps> = ({
  managementGroupId,
  paymentGroupId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { paymentGroup, error } = useGetPaymentGroup(
    managementGroupId,
    paymentGroupId
  );
  const updatePaymentGroup = useUpdatePaymentGroup(
    managementGroupId,
    paymentGroupId
  );
  const handleSubmit = (
    params: UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest
  ) => {
    void updatePaymentGroup(params);
    onClose();
  };

  if (error?.response?.status === 404) return <>支払グループが見つかりません</>;

  return (
    <>
      <OutlineButton
        onClick={onOpen}
        colorScheme='green'
        isLoading={paymentGroup === undefined}
      >
        編集
      </OutlineButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>支払グループ編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paymentGroup === undefined ? (
              <Spinner />
            ) : (
              <Form<
                UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest,
                typeof UpdatePaymentGroupSchema
              >
                onSubmit={handleSubmit}
                mx='auto'
                schema={UpdatePaymentGroupSchema}
                width={350}
              >
                {({ register, formState: { errors, isSubmitting } }) => (
                  <>
                    <InputField
                      error={errors.name}
                      id='name'
                      formLabel='支払グループ名'
                      register={register('name')}
                      placeholder='家族'
                      mt={5}
                      defaultValue={paymentGroup.name}
                    />
                    <OutlineButton
                      type='submit'
                      colorScheme='cyan'
                      isLoading={isSubmitting}
                      mt={5}
                    >
                      更新
                    </OutlineButton>
                  </>
                )}
              </Form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

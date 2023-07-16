import { FC } from 'react';
import {
  ManagementGroup,
  PaymentGroup,
  Expense,
  UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest,
} from 'src/openapi-generator';
import { useUpdateExpense } from 'src/features/expenses/api/updateExpense';
import {
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from '@chakra-ui/react';
import { OutlineButton } from 'src/components/elements';
import {
  Form,
  SelectField,
  InputField,
  NumberInputField,
} from 'src/components/parts';
import { UpdateExpenseSchema } from 'src/features/expenses/formSchemas/updateExpenseSchema';
import { useGetPaymentGroupPaymentAffiliations } from 'src/features/payment_groups/api/getPaymentGroupPaymentAffiliations';
import { useGetExpense } from 'src/features/expenses/api/getExpense';

type ExpenseEditModalFormProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
  expenseId: Expense['id'];
};

export const ExpenseEditModalForm: FC<ExpenseEditModalFormProps> = ({
  managementGroupId,
  paymentGroupId,
  expenseId,
}) => {
  const {
    paymentGroupPaymentAffiliations,
    error: paymentGroupPaymentAffiliationsError,
  } = useGetPaymentGroupPaymentAffiliations(managementGroupId, paymentGroupId);
  const { expense, error: expenseError } = useGetExpense(
    managementGroupId,
    paymentGroupId,
    expenseId
  );
  const updateExpense = useUpdateExpense(
    managementGroupId,
    paymentGroupId,
    expenseId
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (expense === undefined) return <Spinner />;
  if (expenseError?.response?.status === 404) return <>費用が見つかりません</>;

  return (
    <>
      <Center>
        <OutlineButton colorScheme='green' onClick={onOpen}>
          編集
        </OutlineButton>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>費用編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form<
              UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest,
              typeof UpdateExpenseSchema
            >
              onSubmit={updateExpense}
              mx='auto'
              schema={UpdateExpenseSchema}
              width={350}
            >
              {({ register, formState: { errors, isSubmitting } }) => (
                <>
                  {paymentGroupPaymentAffiliationsError?.response?.status ===
                  404 ? (
                    <>ユーザーが見つかりません</>
                  ) : paymentGroupPaymentAffiliations === undefined ? (
                    <Spinner />
                  ) : (
                    <SelectField
                      error={errors.user_id}
                      id='user_id'
                      formLabel='支払ったユーザー'
                      register={register('user_id')}
                      mt={5}
                      options={[
                        { value: '', label: '選択してください' },
                        ...paymentGroupPaymentAffiliations.map(
                          (paymentGroupPaymentAffiliation) => ({
                            value: paymentGroupPaymentAffiliation.user.id,
                            label: paymentGroupPaymentAffiliation.user.name,
                          })
                        ),
                      ]}
                      defaultValue={expense.user.id}
                    />
                  )}
                  <InputField
                    error={errors.paid_on}
                    id='paid_on'
                    formLabel='支払日'
                    type='date'
                    register={register('paid_on')}
                    defaultValue={expense.paid_on}
                    mt={5}
                  />
                  <InputField
                    error={errors.description}
                    id='description'
                    formLabel='説明'
                    register={register('description')}
                    defaultValue={expense.description}
                    placeholder='食費'
                    mt={5}
                  />
                  <NumberInputField
                    error={errors.amount_of_money}
                    id='amount_of_money'
                    formLabel='金額'
                    register={register('amount_of_money', {
                      valueAsNumber: true,
                    })}
                    placeholder='金額'
                    defaultValue={expense.amount_of_money}
                    min={1}
                    mt={5}
                  />
                  <OutlineButton
                    colorScheme='cyan'
                    type='submit'
                    isLoading={isSubmitting}
                    mt={5}
                  >
                    更新
                  </OutlineButton>
                </>
              )}
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

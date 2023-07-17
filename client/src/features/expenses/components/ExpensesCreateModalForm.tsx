import { FC, Fragment, useEffect, useCallback, useState } from 'react';
import { useGetPaymentGroupPaymentAffiliations } from 'src/features/payment_groups/api/getPaymentGroupPaymentAffiliations';
import {
  BulkInsertExpensesByManagementGroupIdAndPaymentGroupIdRequest,
  Expense,
  ManagementGroup,
  PaymentGroup,
} from 'src/openapi-generator';
import {
  Center,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  HStack,
  Spinner,
  Text,
  Flex,
} from '@chakra-ui/react';
import { OutlineButton, NoDecorationLink } from 'src/components/elements';
import {
  InputField,
  NumberInputField,
  SelectField,
} from 'src/components/parts';
import { useBulkInsertExpenses } from 'src/features/expenses/api/bulkInsertExpenses';
import { BulkInsertExpenseWithDebtRecordsSchema } from 'src/features/expenses/formSchemas/bulkInsertExpensesSchema';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

type ExpensesCreateModalFormProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const ExpensesCreateModalForm: FC<ExpensesCreateModalFormProps> = ({
  managementGroupId,
  paymentGroupId,
}) => {
  const { paymentGroupPaymentAffiliations, error } =
    useGetPaymentGroupPaymentAffiliations(managementGroupId, paymentGroupId);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<BulkInsertExpensesByManagementGroupIdAndPaymentGroupIdRequest>({
    resolver: zodResolver(BulkInsertExpenseWithDebtRecordsSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddClick = useCallback(() => {
    append({ user_id: '', paid_on: '', description: '', amount_of_money: 0 });
  }, [append]);

  const bulkInsertExpenses = useBulkInsertExpenses(
    managementGroupId,
    paymentGroupId,
    setExpenses,
    reset,
    handleAddClick
  );

  useEffect(() => {
    handleAddClick();

    return () => remove(0);
  }, [handleAddClick, remove]);

  return (
    <>
      <Center>
        <HStack>
          <OutlineButton
            onClick={() => {
              setExpenses([]);
              onOpen();
            }}
            colorScheme='teal'
          >
            費用作成
          </OutlineButton>
          {expenses.length !== 0 && (
            <OutlineButton onClick={onOpen} colorScheme='yellow'>
              作成費用確認
            </OutlineButton>
          )}
        </HStack>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {expenses.length === 0 ? (
            <>
              <ModalHeader>費用作成</ModalHeader>
              <ModalBody>
                <Box
                  as='form'
                  onSubmit={handleSubmit(bulkInsertExpenses)}
                  width={350}
                  mx='auto'
                >
                  {isSubmitted && errors.expenses && (
                    <Text fontSize='sm' color='red.300' mt='5'>
                      {errors.expenses.message}
                    </Text>
                  )}
                  {fields.map((field, index) => (
                    <Fragment key={field.id}>
                      {error?.response?.status === 404 ? (
                        <>ユーザーが見つかりません</>
                      ) : paymentGroupPaymentAffiliations === undefined ? (
                        <Spinner />
                      ) : (
                        <SelectField
                          error={errors.expenses?.[index]?.user_id}
                          id={`user_id_${field.id}`}
                          formLabel='支払ったユーザー'
                          register={register(
                            `expenses.${index}.user_id` as const
                          )}
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
                        />
                      )}
                      <InputField
                        error={errors.expenses?.[index]?.paid_on}
                        id={`paid_on_${field.id}`}
                        formLabel='支払日'
                        type='date'
                        register={register(
                          `expenses.${index}.paid_on` as const
                        )}
                        mt={5}
                      />
                      <InputField
                        error={errors.expenses?.[index]?.description}
                        id={`description_${field.id}`}
                        formLabel='説明'
                        register={register(
                          `expenses.${index}.description` as const
                        )}
                        placeholder='食費'
                        mt={5}
                      />
                      <NumberInputField
                        error={errors.expenses?.[index]?.amount_of_money}
                        id={`amount_of_money_${field.id}`}
                        formLabel='金額'
                        register={register(
                          `expenses.${index}.amount_of_money` as const,
                          { valueAsNumber: true }
                        )}
                        placeholder='金額'
                        min={1}
                        mt={5}
                      />
                      {fields.length > 1 && (
                        <OutlineButton
                          width={350}
                          colorScheme='red'
                          onClick={() => remove(index)}
                          mt={5}
                        >
                          削除
                        </OutlineButton>
                      )}
                    </Fragment>
                  ))}
                  <Flex justify='flex-end'>
                    <OutlineButton
                      onClick={handleAddClick}
                      mt={5}
                      colorScheme='orange'
                    >
                      追加
                    </OutlineButton>
                  </Flex>
                  <HStack mt={5}>
                    <OutlineButton
                      type='submit'
                      colorScheme='cyan'
                      isLoading={isSubmitting}
                    >
                      作成
                    </OutlineButton>
                    <OutlineButton onClick={onClose}>キャンセル</OutlineButton>
                  </HStack>
                </Box>
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader>費用作成完了</ModalHeader>
              <ModalBody>
                {expenses.map((expense) => (
                  <NoDecorationLink
                    display='block'
                    key={expense.id}
                    href={`/payment_groups/${paymentGroupId}/expenses/${expense.id}`}
                    mx='auto'
                    bg='#164b9f1b'
                    boxShadow='dark-lg'
                    rounded='md'
                    width={400}
                    mt={5}
                    pl={3}
                    py={2}
                  >
                    {expense.description}
                    <br />
                    <br />
                    支払ったユーザー: {expense.user.name}
                    <br />
                    金額: {expense.amount_of_money.toLocaleString()}円
                    <br />
                    支払日:{' '}
                    {dayjs(new Date(expense.paid_on)).format('YYYY/MM/DD')}
                  </NoDecorationLink>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

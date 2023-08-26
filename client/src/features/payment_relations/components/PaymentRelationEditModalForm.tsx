import { FC, Fragment, useEffect, useState } from 'react';
import {
  Spinner,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { OutlineButton } from 'src/components/elements';
import {
  InputField,
  NumberInputField,
  HiddenInputField,
} from 'src/components/parts';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  BulkInsertPaymentRelationByManagementGroupIdRequest,
  ManagementGroup,
  PaymentGroup,
  User,
} from 'src/openapi-generator';
import { zodResolver } from '@hookform/resolvers/zod';
import { BulkInsertPaymentRelationSchema } from 'src/features/payment_relations/formSchemas/bulkInsertPaymentRelationSchema';
import { useBulkUpdatePaymentRelation } from 'src/features/payment_relations/api/bulkUpdatePaymentRelation';
import { useGetManagementGroupUsers } from 'src/features/management_groups/api/getManagementGroupUsers';
import { useGetPaymentGroup } from 'src/features/payment_groups/api/getPaymentGroup';
import { useGetPaymentGroupPaymentAffiliations } from 'src/features/payment_groups/api/getPaymentGroupPaymentAffiliations';
import { useGetPaymentGroupExpenses } from 'src/features/payment_groups/api/getPaymentGroupExpenses';

type PaymentRelationEditModalFormProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const PaymentRelationEditModalForm: FC<
  PaymentRelationEditModalFormProps
> = ({ managementGroupId, paymentGroupId }) => {
  const { managementGroupUsers, error: managementGroupUsersError } =
    useGetManagementGroupUsers(managementGroupId);
  const { paymentGroup, error: paymentGroupError } = useGetPaymentGroup(
    managementGroupId,
    paymentGroupId
  );
  const {
    paymentGroupPaymentAffiliations,
    error: paymentGroupPaymentAffiliationsError,
  } = useGetPaymentGroupPaymentAffiliations(managementGroupId, paymentGroupId);
  const { paymentGroupExpenses, error: paymentGroupExpensesError } =
    useGetPaymentGroupExpenses(managementGroupId, paymentGroupId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit: reactHookFormHandleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<BulkInsertPaymentRelationByManagementGroupIdRequest>({
    resolver: zodResolver(BulkInsertPaymentRelationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'affiliations',
  });
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>(
    {}
  );
  const bulkUpdatePaymentRelation = useBulkUpdatePaymentRelation(
    managementGroupId,
    paymentGroupId
  );

  const handleChange = (user: User) => {
    const index = fields
      .map((field) => field.user_id)
      .findIndex((user_id) => user_id === user.id);
    if (index === -1) {
      setSelectedUsers((prev) => ({
        ...prev,
        [user.id]: user.name,
      }));
      append({ user_id: user.id, ratio: 0.01 });
    } else {
      remove(index);
      setSelectedUsers((prev) => {
        const users = { ...prev };
        delete users[user.id];

        return users;
      });
    }
  };

  const handleSubmit = (
    params: BulkInsertPaymentRelationByManagementGroupIdRequest
  ) => {
    void bulkUpdatePaymentRelation(params);
    onClose();
  };

  useEffect(() => {
    if (paymentGroupPaymentAffiliations !== undefined) {
      setSelectedUsers(
        paymentGroupPaymentAffiliations.reduce((acc, cur) => {
          acc[cur.user.id] = cur.user.name;

          return acc;
        }, {} as Record<string, string>)
      );

      reset({
        affiliations: paymentGroupPaymentAffiliations.map((affiliation) => ({
          user_id: affiliation.user.id,
          ratio: affiliation.ratio,
        })),
      });
    }
  }, [append, paymentGroupPaymentAffiliations, reset]);

  if (
    paymentGroupPaymentAffiliationsError?.response?.status === 404 ||
    paymentGroupError?.response?.status === 404 ||
    paymentGroupExpensesError?.response?.status === 404
  )
    return <>支払グループが見つかりません</>;

  return (
    <>
      <OutlineButton onClick={onOpen} colorScheme='green'>
        更新
      </OutlineButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>支払グループ更新</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paymentGroupPaymentAffiliations === undefined ||
            paymentGroup === undefined ||
            paymentGroupExpenses === undefined ? (
              <Spinner />
            ) : (
              <>
                <Box
                  as='form'
                  onSubmit={reactHookFormHandleSubmit(handleSubmit)}
                  width={350}
                  mx='auto'
                >
                  <InputField
                    error={errors.group?.name}
                    id='name'
                    formLabel='グループ名'
                    type='text'
                    placeholder='家族'
                    register={register('group.name')}
                    defaultValue={paymentGroup.name}
                    mt={5}
                  />
                  {isSubmitted && errors.affiliations && (
                    <Text fontSize='sm' color='red.300' mt={5}>
                      {errors.affiliations.message}
                    </Text>
                  )}
                  {fields.map((field, index) => (
                    <Fragment key={field.id}>
                      <HiddenInputField value={field.user_id} />
                      <NumberInputField
                        error={errors.affiliations?.[index]?.ratio}
                        id={`ratio_${field.user_id}`}
                        formLabel={`${selectedUsers[field.user_id]}の支払割合`}
                        min={0.01}
                        max={0.99}
                        precision={2}
                        step={0.01}
                        register={register(
                          `affiliations.${index}.ratio` as const,
                          {
                            valueAsNumber: true,
                          }
                        )}
                        mt={5}
                        isDisabled={paymentGroupExpenses.length > 0}
                      />
                    </Fragment>
                  ))}
                  <HStack mt={5}>
                    <OutlineButton
                      type='submit'
                      colorScheme='green'
                      isLoading={isSubmitting}
                    >
                      更新
                    </OutlineButton>
                    <OutlineButton onClick={onClose}>キャンセル</OutlineButton>
                  </HStack>
                </Box>
                <Box width={350} mx='auto' mt={5}>
                  <Text>ユーザー</Text>
                  <Stack>
                    {managementGroupUsersError?.response?.status === 404 ? (
                      <>ユーザーが見つかりません</>
                    ) : managementGroupUsers === undefined ? (
                      <Spinner />
                    ) : (
                      managementGroupUsers.map((managementGroupUser) => (
                        <Checkbox
                          key={managementGroupUser.id}
                          onChange={() => handleChange(managementGroupUser)}
                          defaultChecked={
                            fields
                              .map((field) => field.user_id)
                              .find(
                                (user_id) => user_id === managementGroupUser.id
                              ) !== undefined
                          }
                          disabled={paymentGroupExpenses.length > 0}
                        >
                          {managementGroupUser.name}
                        </Checkbox>
                      ))
                    )}
                  </Stack>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

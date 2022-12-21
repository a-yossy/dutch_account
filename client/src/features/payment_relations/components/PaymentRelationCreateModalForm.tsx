import { FC, Fragment, useState } from 'react';
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
  Center,
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
  User,
} from 'src/openapi-generator';
import { zodResolver } from '@hookform/resolvers/zod';
import { BulkInsertPaymentRelationSchema } from 'src/features/payment_relations/formSchemas/bulkInsertPaymentRelationSchema';
import { useBulkInsertPaymentRelation } from 'src/features/payment_relations/api/bulkInsertPaymentRelation';
import { useGetManagementGroupUsers } from 'src/features/management_groups/api/getManagementGroupUsers';
import NotFoundErrorPage from 'src/pages/404';

type PaymentRelationCreateModalFormProps = {
  managementGroup: ManagementGroup;
};

export const PaymentRelationCreateModalForm: FC<
  PaymentRelationCreateModalFormProps
> = ({ managementGroup }) => {
  const { managementGroupUsers, error } = useGetManagementGroupUsers(
    managementGroup.id
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
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
  const bulkInsertPaymentRelation = useBulkInsertPaymentRelation(
    managementGroup.id
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

  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  return (
    <>
      <Center>
        <OutlineButton onClick={onOpen} colorScheme='teal'>
          支払グループ作成
        </OutlineButton>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>支払グループ作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as='form'
              onSubmit={handleSubmit(bulkInsertPaymentRelation)}
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
                    error={
                      isSubmitted
                        ? errors.affiliations?.[index]?.ratio
                        : undefined
                    }
                    id={`ratio_${field.user_id}`}
                    formLabel={`${selectedUsers[field.user_id]}の支払割合`}
                    min={0.01}
                    max={0.99}
                    precision={2}
                    step={0.01}
                    register={register(`affiliations.${index}.ratio` as const, {
                      valueAsNumber: true,
                    })}
                    mt={5}
                  />
                </Fragment>
              ))}
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
            <Box width={350} mx='auto' mt={5}>
              <Text>ユーザー</Text>
              <Stack>
                {managementGroupUsers === undefined ? (
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
                    >
                      {managementGroupUser.name}
                    </Checkbox>
                  ))
                )}
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

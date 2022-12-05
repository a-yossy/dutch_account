import { FC, Fragment, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Spinner,
  Text,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import { useGetManagementGroup } from 'src/features/management_groups/[management_group_id]/hooks/useGetManagementGroup';
import NotFoundErrorPage from 'src/pages/404';
import { useGetManagementAffiliationUsers } from 'src/features/management_groups/[management_group_id]/hooks/useGetManagementAffiliationUsers';
import { useGetPaymentGroups } from 'src/features/management_groups/[management_group_id]/hooks/useGetPaymentGroups';
import {
  NoDecorationLink,
  OutlineButton,
  Input,
} from 'src/components/elements';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  BulkInsertPaymentRelationByManagementGroupIdRequest,
  User,
} from 'src/openapi-generator';
import { zodResolver } from '@hookform/resolvers/zod';
import { BulkInsertPaymentRelationSchema } from 'src/features/management_groups/[management_group_id]/formSchemas/bulkInsertPaymentRelationSchema';
import { useBulkInsertPaymentRelation } from 'src/features/management_groups/[management_group_id]/hooks/useBulkInsertPaymentRelation';

const ManagementGroupPage: NextPage = () => {
  const router = useRouter();
  const { management_group_id: managementGroupId } = router.query;

  if (typeof managementGroupId !== 'string') return <Spinner />;

  return <ManagementGroup managementGroupId={managementGroupId} />;
};

export default ManagementGroupPage;

type ManagementGroupProps = {
  managementGroupId: string;
};

const ManagementGroup: FC<ManagementGroupProps> = ({ managementGroupId }) => {
  const { managementGroup, error: managementGroupError } =
    useGetManagementGroup(managementGroupId);
  const { managementAffiliationUsers, error: managementAffiliationUsersError } =
    useGetManagementAffiliationUsers(managementGroup?.id);
  const { paymentGroups, error: paymentGroupsError } = useGetPaymentGroups(
    managementGroup?.id
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
  const bulkInsertPaymentRelation =
    useBulkInsertPaymentRelation(managementGroupId);

  const handleChange = (user: User) => {
    const index = fields
      .map((field) => field.user_id)
      .findIndex((user_id) => user_id === user.id);
    if (index === -1) {
      setSelectedUsers((prev) => ({
        ...prev,
        [user.id]: user.name,
      }));
      append({ user_id: user.id, ratio: 0 });
    } else {
      remove(index);
      setSelectedUsers((prev) => {
        const users = { ...prev };
        delete users[user.id];

        return users;
      });
    }
  };

  if (
    managementGroupError?.response?.status === 404 ||
    managementAffiliationUsersError?.response?.status === 404 ||
    paymentGroupsError?.response?.status === 404
  )
    return <NotFoundErrorPage />;

  if (!managementGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        管理グループ：{managementGroup.name}
      </Text>
      <Tabs isFitted width={450} mx='auto' mt={5}>
        <TabList>
          <Tab>ユーザー</Tab>
          <Tab>支払グループ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {managementAffiliationUsers === undefined ? (
              <Spinner />
            ) : (
              managementAffiliationUsers.map((managementAffiliationUser) => (
                <Box
                  key={managementAffiliationUser.id}
                  width={400}
                  mx='auto'
                  boxShadow='dark-lg'
                  rounded='md'
                  bg='#164b9f1b'
                  height={12}
                  display='flex'
                  alignItems='center'
                  pl={3}
                  mt={5}
                >
                  {managementAffiliationUser.name}
                </Box>
              ))
            )}
          </TabPanel>
          <TabPanel>
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
                    <Input
                      error={errors.group?.name}
                      id='name'
                      formLabel='グループ名'
                      type='text'
                      register={register('group.name')}
                      placeholder='家族'
                      mt={5}
                    />
                    {isSubmitted && errors.affiliations && (
                      <Text fontSize='sm' color='red.300' mt={5}>
                        {errors.affiliations.message}
                      </Text>
                    )}
                    {fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <Input
                          error={
                            isSubmitted
                              ? errors.affiliations?.[index]?.user_id
                              : undefined
                          }
                          value={field.user_id}
                          type='hidden'
                          register={register(
                            `affiliations.${index}.user_id` as const
                          )}
                        />
                        <Input
                          error={
                            isSubmitted
                              ? errors.affiliations?.[index]?.ratio
                              : undefined
                          }
                          id={`ratio_${field.user_id}`}
                          formLabel={`${
                            selectedUsers[field.user_id]
                          }の支払割合`}
                          type='number'
                          step='0.01'
                          register={register(
                            `affiliations.${index}.ratio` as const,
                            { valueAsNumber: true }
                          )}
                          placeholder='0.5'
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
                      <OutlineButton onClick={onClose}>
                        キャンセル
                      </OutlineButton>
                    </HStack>
                  </Box>
                  <Box width={350} mx='auto' mt={5}>
                    <Text>ユーザー</Text>
                    <Stack>
                      {managementAffiliationUsers === undefined ? (
                        <Spinner />
                      ) : (
                        managementAffiliationUsers.map(
                          (managementAffiliationUser) => (
                            <Checkbox
                              key={managementAffiliationUser.id}
                              onChange={() =>
                                handleChange(managementAffiliationUser)
                              }
                              defaultChecked={
                                fields
                                  .map((field) => field.user_id)
                                  .find(
                                    (user_id) =>
                                      user_id === managementAffiliationUser.id
                                  ) !== undefined
                              }
                            >
                              {managementAffiliationUser.name}
                            </Checkbox>
                          )
                        )
                      )}
                    </Stack>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
            {paymentGroups === undefined && <Spinner />}
            {paymentGroups !== undefined &&
              (paymentGroups.length === 0 ? (
                <Text align='center' mt={5}>
                  グループが存在しません
                </Text>
              ) : (
                paymentGroups.map((paymentGroup) => (
                  <NoDecorationLink
                    href={`/management_groups/${managementGroupId}/payment_groups/${paymentGroup.id}`}
                    key={paymentGroup.id}
                    width={400}
                    mx='auto'
                    boxShadow='dark-lg'
                    rounded='md'
                    bg='#164b9f1b'
                    height={12}
                    display='flex'
                    alignItems='center'
                    pl={3}
                    mt={5}
                  >
                    {paymentGroup.name}
                  </NoDecorationLink>
                ))
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

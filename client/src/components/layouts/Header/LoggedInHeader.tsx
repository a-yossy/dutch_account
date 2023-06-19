import { FC } from 'react';
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  Select,
  Spinner,
  FormLabel,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { User } from 'src/openapi-generator';
import { NoDecorationLink } from 'src/components/elements';
import { useLogOut } from 'src/components/layouts/Header/hooks';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';
import { useGetManagementGroups } from 'src/features/management_groups/api/getManagementGroups';
import {
  useGetCurrentManagementGroup,
  useSetCurrentManagementGroup,
} from 'src/recoil/currentManagementGroupState';

type LoggedInHeaderProps = {
  currentUser: User;
};

export const LoggedInHeader: FC<LoggedInHeaderProps> = ({ currentUser }) => {
  const logOut = useLogOut();
  const currentManagementGroup = useGetCurrentManagementGroup();
  const setCurrentManagementGroup = useSetCurrentManagementGroup();
  const managementGroups = useGetManagementGroups();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const managementGroup = managementGroups?.find(
      (group) => group.id === event.target.value
    );
    if (managementGroup) {
      setCurrentManagementGroup({ state: 'existence', data: managementGroup });
    } else if (event.target.value === '') {
      setCurrentManagementGroup({ state: 'not_existence' });
    }
  };

  return (
    <CommonHeader>
      <Menu>
        <MenuButton
          mr={10}
          as={IconButton}
          icon={<HamburgerIcon />}
          variant='ghost'
        />
        <MenuList>
          <Text ml={3}>{currentUser.name}</Text>
          <MenuDivider />
          <NoDecorationLink href='/mypage'>
            <MenuItem>マイページ</MenuItem>
          </NoDecorationLink>
          <MenuDivider />
          {managementGroups === undefined ? (
            <Spinner />
          ) : (
            <>
              <FormLabel htmlFor='managementGroup' ml={3}>
                管理グループ
              </FormLabel>
              <Select
                id='managementGroup'
                defaultValue={
                  currentManagementGroup.state === 'existence'
                    ? currentManagementGroup.data.id
                    : undefined
                }
                onChange={handleChange}
                width='90%'
                mx='auto'
              >
                {managementGroups.length === 0 ? (
                  <option value=''>グループが存在しません</option>
                ) : (
                  <>
                    <option value=''>選択してください</option>
                    {managementGroups.map((managementGroup) => (
                      <option
                        value={managementGroup.id}
                        key={managementGroup.id}
                      >
                        {managementGroup.name}
                      </option>
                    ))}
                  </>
                )}
              </Select>
            </>
          )}
          <MenuDivider />
          <MenuItem onClick={logOut}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </CommonHeader>
  );
};

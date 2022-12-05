import { FC } from 'react';
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { User } from 'src/openapi-generator';
import { NoDecorationLink } from 'src/components/elements';
import { useLogOut } from 'src/components/layouts/Header/hooks';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';

type LoggedInHeaderProps = {
  currentUser: User;
};

export const LoggedInHeader: FC<LoggedInHeaderProps> = ({ currentUser }) => {
  const logOut = useLogOut();

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
          <NoDecorationLink href='/management_groups'>
            <MenuItem>管理グループ</MenuItem>
          </NoDecorationLink>
          <MenuDivider />
          <MenuItem onClick={logOut}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </CommonHeader>
  );
};

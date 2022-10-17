import { FC } from 'react';
import {
  Flex,
  Spacer,
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
import { NoDecorationLink } from 'src/components/NoDecorationLink';
import { useLogOut } from 'src/hooks/useLogOut';

type LoggedInHeaderProps = {
  currentUser: User;
};

export const LoggedInHeader: FC<LoggedInHeaderProps> = ({ currentUser }) => {
  const logOut = useLogOut();

  return (
    <header>
      <Flex
        minWidth='max-content'
        alignItems='center'
        gap='4'
        background='#68697d1b'
        h='60px'
      >
        <NoDecorationLink href='/' ml={10} fontSize={20} fontWeight='bold'>
          Dutch Account
        </NoDecorationLink>
        <Spacer />
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
            <MenuItem onClick={logOut}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  );
};

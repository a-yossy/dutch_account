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
import { User } from 'openapi-generator/api';
import NoDecorationLink from 'src/components/NoDecorationLink';
import useSignOut from 'src/hooks/useSignOut';

type SignedInHeaderProps = {
  currentUser: User;
};

const SignedInHeader: FC<SignedInHeaderProps> = ({ currentUser }) => {
  const signOut = useSignOut();

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
            <MenuItem onClick={signOut}>サインアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  );
};

export default SignedInHeader;

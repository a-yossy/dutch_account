import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import NoDecorationLink from 'src/components/NoDecorationLink';

const Header: FC = () => (
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
    </Flex>
  </header>
);

export default Header;

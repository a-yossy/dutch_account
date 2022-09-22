import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import NoDecorationLink from 'components/NoDecorationLink';

const Header: FC = () => (
  <header>
    <Flex
      minWidth='max-content'
      alignItems='center'
      gap='4'
      background='#68697d1b'
      h='60px'
    >
      <NoDecorationLink
        title='Dutch Account'
        href='/'
        ml={20}
        fontSize={20}
        fontWeight='bold'
      />
    </Flex>
  </header>
);

export default Header;

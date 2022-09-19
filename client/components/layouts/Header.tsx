import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'components/Link';

const Header: FC = () => (
  <header>
    <Flex
      minWidth='max-content'
      alignItems='center'
      gap='4'
      background='#68697d1b'
      h='60px'
    >
      <Link
        href='/'
        ml={20}
        fontSize={20}
        fontWeight='bold'
        title='Dutch Account'
      />
    </Flex>
  </header>
);

export default Header;

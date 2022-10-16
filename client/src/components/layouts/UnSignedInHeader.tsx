import { FC } from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import NoDecorationLink from 'src/components/NoDecorationLink';

const UnSignedInHeader: FC = () => (
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
      <NoDecorationLink href='/sign_in'>サインイン</NoDecorationLink>
      <NoDecorationLink href='/sign_up' mr={20}>
        サインアップ
      </NoDecorationLink>
    </Flex>
  </header>
);

export default UnSignedInHeader;

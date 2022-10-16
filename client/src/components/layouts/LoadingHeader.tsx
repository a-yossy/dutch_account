import { FC } from 'react';
import { Flex, Spacer, Spinner } from '@chakra-ui/react';
import NoDecorationLink from 'src/components/NoDecorationLink';

const LoadingHeader: FC = () => (
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
      <Spinner mr={10} />
    </Flex>
  </header>
);

export default LoadingHeader;

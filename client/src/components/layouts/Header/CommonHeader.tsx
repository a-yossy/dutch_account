import { FC, ReactNode } from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { NoDecorationLink } from 'src/components/elements';

type CommonHeaderProps = {
  children: ReactNode;
};

export const CommonHeader: FC<CommonHeaderProps> = ({ children }) => (
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
      {children}
    </Flex>
  </header>
);

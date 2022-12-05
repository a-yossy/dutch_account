import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';

export const LoadingHeader: FC = () => (
  <CommonHeader>
    <Spinner mr={10} />
  </CommonHeader>
);

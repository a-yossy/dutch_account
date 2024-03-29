import { useCallback } from 'react';
import {
  useToast as useChakraToast,
  ToastProps as ChakraToastProps,
  ToastId,
} from '@chakra-ui/react';

export const useToast = () => {
  const chakraToast = useChakraToast();
  const toast = useCallback(
    (
      status: ChakraToastProps['status'],
      title: ChakraToastProps['title'],
      description?: ChakraToastProps['description']
    ): ToastId =>
      chakraToast({
        status,
        title,
        description,
        duration: 5000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          whiteSpace: 'pre-line',
        },
      }),
    [chakraToast]
  );

  return toast;
};

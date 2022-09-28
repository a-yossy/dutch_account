import { useCallback } from 'react';
import {
  useToast as useChakraToast,
  ToastProps as ChakraToastProps,
  ToastId,
} from '@chakra-ui/react';

const useToast = () => {
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
        position: 'top-right',
        containerStyle: {
          whiteSpace: 'pre-line',
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return toast;
};

export default useToast;

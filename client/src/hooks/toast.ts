import {
  useToast as useChakraToast,
  ToastProps as ChakraToastProps,
  ToastId,
} from '@chakra-ui/react';

const useToast = () => {
  const chakraToast = useChakraToast();
  const toast = (
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
    });

  return toast;
};

export default useToast;

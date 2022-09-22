import { FC } from 'react';
import NextLink from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

type NoDecorationLinkProps = {
  href: string;
  title: string;
} & ChakraLinkProps;

const NoDecorationLink: FC<NoDecorationLinkProps> = ({
  href,
  title,
  ...props
}) => (
  <NextLink href={href} passHref>
    <ChakraLink {...props} style={{ textDecoration: 'none' }}>
      {title}
    </ChakraLink>
  </NextLink>
);

export default NoDecorationLink;

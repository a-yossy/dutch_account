import { FC } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

type NoDecorationLinkProps = {
  href: string;
  title: string;
} & LinkProps;

const NoDecorationLink: FC<NoDecorationLinkProps> = ({
  href,
  title,
  ...props
}) => (
  <NextLink href={href} passHref>
    <Link {...props} style={{ textDecoration: 'none' }}>
      {title}
    </Link>
  </NextLink>
);

export default NoDecorationLink;

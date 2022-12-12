import { FC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { OmitStrict } from 'src/types/omitStrict';

export type NoDecorationLinkProps = {
  href: NextLinkProps['href'];
} & OmitStrict<LinkProps, 'href'>;

export const NoDecorationLink: FC<NoDecorationLinkProps> = ({
  href,
  children,
  ...props
}) => (
  <NextLink href={href} passHref>
    <Link {...props} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  </NextLink>
);

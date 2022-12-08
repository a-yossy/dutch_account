import { FC } from 'react';
import {
  NoDecorationLink,
  NoDecorationLinkProps,
} from 'src/components/elements/Link';
import { OmitStrict } from 'src/types/omitStrict';

type OneLineCardLinkProps = OmitStrict<
  NoDecorationLinkProps,
  'width' | 'boxShadow' | 'rounded' | 'height' | 'display' | 'alignItems'
>;

export const OneLineCardLink: FC<OneLineCardLinkProps> = ({
  children,
  ...props
}) => (
  <NoDecorationLink
    width={400}
    boxShadow='dark-lg'
    rounded='md'
    height={12}
    display='flex'
    alignItems='center'
    {...props}
  >
    {children}
  </NoDecorationLink>
);

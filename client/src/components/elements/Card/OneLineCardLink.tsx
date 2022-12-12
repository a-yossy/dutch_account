import { FC } from 'react';
import {
  NoDecorationLink,
  NoDecorationLinkProps,
} from 'src/components/elements/Link';
import { OmitStrict } from 'src/types/omitStrict';

type OneLineCardLinkProps = OmitStrict<
  NoDecorationLinkProps,
  'display' | 'alignItems'
>;

export const OneLineCardLink: FC<OneLineCardLinkProps> = ({
  children,
  ...props
}) => (
  <NoDecorationLink display='flex' alignItems='center' {...props}>
    {children}
  </NoDecorationLink>
);

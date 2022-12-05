import { FC } from 'react';
import { NoDecorationLink } from 'src/components/elements';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';

export const UnLoggedInHeader: FC = () => (
  <CommonHeader>
    <NoDecorationLink href='/log_in'>ログイン</NoDecorationLink>
    <NoDecorationLink href='/sign_up' mr={20}>
      新規登録
    </NoDecorationLink>
  </CommonHeader>
);

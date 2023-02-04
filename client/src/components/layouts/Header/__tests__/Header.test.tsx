import { render, screen } from '@testing-library/react';
import { HeaderTemplate } from 'src/components/layouts/Header/Header';
import {
  currentUserStateWithLogIn,
  currentUserStateWithLoading,
  currentUserStateWithLogOut,
} from 'src/__fixtures__/currentUserState';

describe('ヘッダー', () => {
  it('ログイン時にはユーザー名が表示されること', () => {
    render(<HeaderTemplate currentUser={currentUserStateWithLogIn} />);
    const name = screen.getByText('太郎');

    expect(name).toBeInTheDocument();
  });

  it('ローディング時にスピナーが表示されること', () => {
    const { baseElement } = render(
      <HeaderTemplate currentUser={currentUserStateWithLoading} />
    );
    const spinner = baseElement.getElementsByClassName('chakra-spinner');

    expect(spinner.length).toBe(1);
  });

  it('ログアウト時に新規登録が表示されること', () => {
    render(<HeaderTemplate currentUser={currentUserStateWithLogOut} />);
    const signUp = screen.getByRole('link', { name: '新規登録' });

    expect(signUp).toBeInTheDocument();
  });
});

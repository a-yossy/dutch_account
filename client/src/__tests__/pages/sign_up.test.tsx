import { render, screen } from '@testing-library/react';
import SignUpPage from 'src/pages/sign_up';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: jest.fn(),
    };
  },
}));

describe('新規登録ページ', () => {
  it('ページが表示されていること', () => {
    render(<SignUpPage />);
    const text = screen.getByRole('button', { name: '登録' });

    expect(text).toBeInTheDocument();
  });
});

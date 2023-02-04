import { screen, render } from '@testing-library/react';
import LogInPage from 'src/pages/log_in';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: jest.fn(),
    };
  },
}));

describe('ログインページ', () => {
  it('ページが表示されていること', () => {
    render(<LogInPage />);
    const text = screen.getByRole('button', { name: 'ログイン' });

    expect(text).toBeInTheDocument();
  });
});

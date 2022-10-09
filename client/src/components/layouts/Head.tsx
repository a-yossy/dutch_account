import { FC } from 'react';
import NextHead from 'next/head';

const Head: FC = () => (
  <NextHead>
    <title>Dutch Account</title>
    <meta name='description' content='dutch account' />
    <link rel='icon' href='/receipt.ico' />
  </NextHead>
);

export default Head;

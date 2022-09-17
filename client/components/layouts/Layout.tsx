import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Header from 'components/layouts/Header'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Head>
      <title>Dutch Account</title>
      <meta name="description" content="dutch account" />
      <link rel="icon" href="/receipt.ico" />
    </Head>
    <Header />
    <main>{children}</main>
  </>
)

export default Layout

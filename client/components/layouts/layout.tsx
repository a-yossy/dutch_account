import { FC, ReactElement } from 'react'
import Header from 'components/layouts/header'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout

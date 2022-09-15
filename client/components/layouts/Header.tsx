import { FC } from "react"
import { Flex, Link } from "@chakra-ui/react"
import NextLink from "next/link"

const Header: FC = () => (
  <header>
    <Flex minWidth='max-content' alignItems='center' gap='4' background='#68697d1b' h='60px'>
      <NextLink href='/' passHref>
        <Link ml={20} fontSize={20} fontWeight='bold' style={{ textDecoration: 'none' }}>Dutch Account</Link>
      </NextLink>
    </Flex>
  </header>
)

export default Header

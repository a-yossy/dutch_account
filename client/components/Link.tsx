import { FC } from "react"
import NextLink from "next/link"
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/react"

type LinkProps = {
  href: string
  ml: ChakraLinkProps['ml']
  fontSize: ChakraLinkProps['fontSize']
  fontWeight: ChakraLinkProps['fontWeight']
  title: string
}

const Link: FC<LinkProps> = ({ href, ml, fontSize, fontWeight, title }) => (
  <NextLink href={href} passHref>
    <ChakraLink ml={ml} fontSize={fontSize} fontWeight={fontWeight} style={{ textDecoration: 'none' }}>
      {title}
    </ChakraLink>
  </NextLink>
)

export default Link

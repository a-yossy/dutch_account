import { FC } from "react"
import NextLink from "next/link"
import { Link as ChakraLink } from "@chakra-ui/react"

type LinkProps = Required<{
  readonly href: string
  readonly ml: number
  readonly fontSize: number
  readonly fontWeight: string
  readonly title: string
}>

const Link: FC<LinkProps> = ({ href, ml, fontSize, fontWeight, title }) => (
  <NextLink href={href} passHref>
    <ChakraLink ml={ml} fontSize={fontSize} fontWeight={fontWeight} style={{ textDecoration: 'none' }}>
      {title}
    </ChakraLink>
  </NextLink>
)

export default Link

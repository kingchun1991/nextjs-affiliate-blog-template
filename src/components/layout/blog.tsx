import React from "react";
import { parseISO, format } from "date-fns";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { ArticleJsonLdLd } from "next-seo";
// import { useRouter } from "next/router";

import Container from "../Container";
import { IFrontMatter } from "../../types/custom-types";

export default function BlogLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode;
  frontMatter: IFrontMatter;
}) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  // const router = useRouter();
  // const slug = router.asPath.replace("/blog", "");
  const dateFormat = "MMMM dd, yyyy";
  return (
    <Container>
      <ArticleJsonLdLd
        // eslint-disable-next-line
        url={"https://standingify.com/blog/" + frontMatter.title}
        title={frontMatter.title}
        images={[""]}
        datePublished={format(parseISO(frontMatter.publishedAt), dateFormat)}
        dateModified={format(parseISO(frontMatter.modifiedAt), dateFormat)}
        authorName="Jane Blogs"
        description={frontMatter.summary}
      />
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="900px"
        w="100%"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="900px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {frontMatter.title}
          </Heading>
          <Flex
            justify="space-between"
            align={["initial", "center"]}
            direction={["column", "row"]}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar
                size="xs"
                name="Frank"
                src="../images/portrait.jpeg"
                mr={2}
              />
              <Box fontSize="sm" color={textColor[colorMode]}>
                {"Frank / "}
                {format(parseISO(frontMatter.publishedAt), dateFormat)}
              </Box>
            </Flex>
            <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {frontMatter.readingTime.text}
            </Text>
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
}

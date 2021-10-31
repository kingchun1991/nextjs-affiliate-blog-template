import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { getAllFilesFrontMatter } from "../../lib/mdx";

import { IPosts } from "../../types/custom-types";

// import { SearchIcon } from "@chakra-ui/icons";

const BlogPost = dynamic(() => import("../../components/BlogPost"));
const Container = dynamic(() => import("../../components/Container"));

export default function Blog({ posts }: { posts: IPosts[] }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = posts
    .sort(
      (a: IPosts, b: IPosts) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((post: IPosts) =>
      post?.title?.toLowerCase().includes(searchValue.toLowerCase())
    );

  if (typeof window === undefined) {
    return <div>Error</div>;
  }
  if (!posts) {
    return <div>Loading..</div>;
  }
  return (
    <>
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="auto"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="auto"
            height="100%"
            px={4}
          >
            <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
              Buyers Guides ({filteredBlogPosts.length} posts)
            </Heading>
            <InputGroup mb={4} mr={4} w="100%">
              <Input
                aria-label="Search by title"
                placeholder="Search by title"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputRightElement>
                {/* <SearchIcon color="gray.300" /> */}
              </InputRightElement>
            </InputGroup>
            {!filteredBlogPosts.length && "No posts found :("}
            {filteredBlogPosts.map((post: IPosts) => (
              <BlogPost key={post.title} {...post} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts: IPosts[] = await getAllFilesFrontMatter("buyers-guides");

  return { props: { posts } };
}

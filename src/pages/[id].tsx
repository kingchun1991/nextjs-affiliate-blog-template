import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
} from "@chakra-ui/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo, ProductJsonLd } from "next-seo";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { AiOutlineAmazon } from "react-icons/ai";
import getData from "../lib/data";
// import getAmazonInfo from "lib/amazon";

interface IBlogTags {
  tags: string;
  marginTop?: SpaceProps["marginTop"];
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  const { tags, marginTop } = props;
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.split("\n").map((tag) => {
        return (
          <Tag size="md" variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  const { date, name } = props;
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Post = (props: any) => {
  // console.log(props)
  const data = props;
  // console.log(data);
  return (
    <Container maxW="8xl" p="15">
      <NextSeo
        title={data.record[0].title_en}
        description={data.record[0].description_en}
        openGraph={{
          type: "website",
          locale: "zh_HK",
          url: `https://standingify.com/${data.record[0].id}`,
          title: `${data.record[0].title_en}`,
          description: `${data.record[0].description_en}`,
          images: [
            {
              url: `${data.record[0].imgSrc}`,
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <ProductJsonLd
        productName={data.record[0].title_en}
        images={data.record[0].imgSrc}
        description={data.record[0].description_en}
        brand={data.record[0].brand}
        color="blue"
        material="steel"
        offers={[
          {
            price: `${data.price}`,
            priceCurrency: `${data.record[0].currency}`,
            itemCondition: "https://schema.org/UsedCondition",
            availability: "https://schema.org/InStock",
            url: `${data.record[0].productUrls}`,
            seller: {
              name: "Amazon",
            },
          },
        ]}
        mpn="925872"
      />
      <Heading as="h1">{data.record[0].title_en}</Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="2"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link
              href=""
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Image
                borderRadius="lg"
                src={data.record[0].imgSrc}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
            <BlogTags tags={data.record[0].tags_en} />
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            前往購買:
          </Text>
          {/* <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} /> */}
          <HStack>
            <Link
              href={data.record[0].productUrls}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              isExternal
            >
              <Button colorScheme="whatsapp" leftIcon={<AiOutlineAmazon />}>
                {data.price} via {data.record[0].source_en}
              </Button>
            </Link>
          </HStack>
        </Box>
      </Box>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">詳細資訊</Heading>
        {data.record[0].detail_en.split("\n").map((row: any) => (
          <Text as="p" fontSize="lg">
            {row}
          </Text>
        ))}
      </VStack>
      <Heading as="h2" marginTop="5">
        相關文章介紹
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link
                href=""
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                <Image
                  transform="scale(1.0)"
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  alt="some text"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Link>
            </Box>
            <BlogTags tags="Engineering\nProduct" marginTop="3" />
            <Heading fontSize="xl" marginTop="2">
              <Link
                href=""
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Some blog title
              </Link>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
            <BlogAuthor
              name="John Doe"
              date={new Date("2021-04-06T19:01:27Z")}
            />
          </Box>
        </WrapItem>
      </Wrap>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const records = await getData();
  // console.log(records);
  const record = records.filter((r: any) => r.id === id);
  // console.log(record[0].productUrls);
  // const price = await getAmazonInfo(record[0].productUrls);
  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: record[0].currency,
  }).format(record[0].price);
  // console.log(price);
  // console.log(record);
  return { props: { record, price } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const records = await getData();
  const paths = records.map((record: any) => ({
    params: { id: record.id },
  }));
  return { paths, fallback: "blocking" };
};

export default Post;

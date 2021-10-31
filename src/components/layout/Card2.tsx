import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  HStack,
  Tag,
  SpaceProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

interface IBlogTags {
  tags: string;
  marginTop?: SpaceProps["marginTop"];
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

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf style={{ marginLeft: "1" }} />;
          }
          return <BsStar style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function ProductAddToCart(props: any) {
  const data2 = props;
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={data2.imgSrc}
          alt={`Picture of ${data2.title}`}
          roundedTop="lg"
        />
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
            <BlogTags tags={data2.tags} />
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              <Link href={`/${data2.url}`}>{data2.title}</Link>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data2.rating} numReviews={data2.numReviews} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;

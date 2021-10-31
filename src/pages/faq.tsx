import React from "react";
import { NextSeo, FAQPageJsonLd } from "next-seo";
import { Heading, Text, Container, VStack } from "@chakra-ui/react";

const FAQ = () => {
  return (
    <Container maxW="7xl" p="12">
      <NextSeo
        title="常見問題"
        description="Amazon 購物注意事項"
        openGraph={{
          type: "website",
          locale: "zh_HK",
          url: `https://standingify.com/faq`,
          title: "常見問題",
          description: "Amazon 購物注意事項",
          images: [
            {
              url: "",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <FAQPageJsonLd
        mainEntity={[
          {
            questionName: "點樣喺亞馬遜買嘢最穩陣?",
            acceptedAnswerText: "要買來自Amazon嘅貨品，咁樣先會較為有保證",
          },
          // {
          //   questionName: "Where can I find information about product recalls?",
          //   acceptedAnswerText: "Read more on under information.",
          // },
        ]}
      />
      <VStack spacing="5" alignItems="flex-start">
        <Heading as="h1" size="3xl">
          常見問題
        </Heading>
        <Heading as="h2" size="xl">
          點樣喺亞馬遜買嘢最穩陣?
        </Heading>
        <Text as="p" fontSize="lg">
          Amazon 購物注意事項: 要買來自Amazon嘅貨品，咁樣先會較為有保證
        </Text>
        <Text as="p" fontSize="lg">
          美馬/英馬：Ships and Sold by Amazon
        </Text>
        <Text as="p" fontSize="lg">
          德馬：Dispatched from and sold by Amazon.
        </Text>
        <Text as="p" fontSize="lg">
          日馬：Ships from Amazon.co.jp Sold by Amazon.co.jp
        </Text>
      </VStack>
    </Container>
  );
};

export default FAQ;

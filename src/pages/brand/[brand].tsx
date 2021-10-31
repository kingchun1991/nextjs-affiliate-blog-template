import { SimpleGrid, Heading } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPaths } from "next";
// import Card from "components/layout/Card";
import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "querystring";
import getData from "../../lib/data";
import Card2 from "components/layout/Card2";

interface IParams extends ParsedUrlQuery {
  id: string;
}

function Brand(props: any) {
  const { records } = props;
  return (
    <>
      <NextSeo
        title={records[0].brand}
        description=""
        openGraph={{
          type: "website",
          locale: "zh_HK",
          url: `https://standingify.com/${records[0].brand}`,
          title: `${records[0].brand}`,
          description: "",
          images: [
            {
              url: `${records[0].imgSrc}`,
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <Heading fontSize="xl" marginTop="2">
        {records[0].brand}
      </Heading>
      <SimpleGrid columns={[1, 2, 2]} spacing="40px">
        {/* <Card2 /> */}
        {records.map((record: any) => {
          // console.log(record);
          // Return the element. Also pass key
          return (
            <Card2
              key={record.id}
              title={record.title_en}
              imgSrc={record.imgSrc}
              url={record.id}
              rating={record.rating}
              numReviews={record.numReviews}
              tags={record.tags_en}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { brand } = context.params as IParams;
  // console.log(brand);
  const data = await getData();
  // console.log(records);
  const records = data.filter((r: any) => r.brand.toLowerCase() === brand);
  // console.log(record[0].productUrls);
  // console.log(price);
  // console.log(record);
  return { props: { records } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const records = await getData();
  const paths = records.map((record: any) => ({
    params: { brand: record.brand.toLowerCase() },
  }));
  return { paths, fallback: "blocking" };
};

export default Brand;

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

function Category(props: any) {
  const { records } = props;
  return (
    <>
      <NextSeo
        title={records[0].categories1_en + records[0].categories2_en}
        description=""
        openGraph={{
          type: "website",
          locale: "zh_HK",
          url: `https://standingify.com/${
            records[0].categories1_en
          }/${records[0].categories2_en.toLowerCase().replace(" ", "")}`,
          title: `${records[0].categories1_en + records[0].categories2_en}`,
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
        {records[0].categories2_en}
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
  const { category } = context.params as IParams;
  // console.log(brand);
  const data = await getData();
  // console.log(records);
  const records = data.filter(
    (r: any) => r.categories2_en.toLowerCase().replace(" ", "") === category
  );
  records.sort((a: any, b: any) => {
    const aUpdateDate = a.updateDate.split("-").join("");
    const bUpdateDate = b.updateDate.split("-").join("");
    return aUpdateDate > bUpdateDate ? -1 : aUpdateDate < bUpdateDate ? 1 : 0;
  });
  // console.log(record[0].productUrls);
  // console.log(price);
  // console.log(records);
  return { props: { records } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const records = data.filter(
    (r: any) => r.categories1_en.toLowerCase().replace(" ", "") === "kitchen"
  );
  const paths = records.map((record: any) => ({
    params: { category: record.categories2_en.toLowerCase().replace(" ", "") },
  }));
  return { paths, fallback: "blocking" };
};

export default Category;

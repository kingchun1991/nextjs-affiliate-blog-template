import { SimpleGrid, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
// import Card from "components/layout/Card";
import getData from "../lib/data";
// import searchById from "../lib/amazon";
import Card2 from "components/layout/Card2";

function Blog(props: any) {
  const data = props;
  return (
    <>
      <Heading fontSize="xl" marginTop="2">
        New
      </Heading>
      <SimpleGrid columns={[1, 2, 2]} spacing="40px">
        {/* <Card2 /> */}
        {data.records.map((record: any) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const records = await getData();
  // var conbinedRecords: any[] = [];
  // records.map(async (record: any) =>{
  //   const amazondata = await searchById(record.id);
  //   const conbinedRecord = Object.assign({},record, amazondata);
  //   conbinedRecords.push(conbinedRecord);
  // });
  // console.log(records);
  // console.log(conbinedRecords);
  // const amazondata = await searchById("B07GVRKCWP");
  // console.log(amazondata.ItemsResult.Items[0].DetailPageURL);
  // console.log(amazondata.ItemsResult.Items[0].Offers?.Listings)
  // console.log(amazondata.ItemsResult.Items[0].Images?.Primary?.Medium?.URL)
  // console.log(amazondata.ItemsResult.Items[0].ItemInfo?.Title?.DisplayValue)
  records.sort((a: any, b: any) => {
    const aUpdateDate = a.updateDate.split("-").join("");
    const bUpdateDate = b.updateDate.split("-").join("");
    return aUpdateDate > bUpdateDate ? -1 : aUpdateDate < bUpdateDate ? 1 : 0;
  });
  return { props: { records } };
};

export default Blog;

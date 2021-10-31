import {
  GetItemsRequest,
  SearchItemsRequest,
  PartnerType,
  Host,
  Region,
} from "paapi5-typescript-sdk";

export const AMAZON_ACCESS_KEY: string = process.env.AMAZON_ACCESS_KEY || "";
export const AMAZON_SECRET_KEY: string = process.env.AMAZON_SECRET_KEY || "";
export const AMAZON_TAG: string = process.env.AMAZON_TAG || "";

export default async function searchById(id: string) {
  // await sleep(5000);
  const request = new GetItemsRequest(
    {
      Condition: "New",
      ItemIds: [id],
      Resources: [
        "Offers.Listings.Price",
        "Images.Primary.Medium",
        "ItemInfo.Title",
      ],
      Merchant: "Amazon",
    },
    AMAZON_TAG,
    PartnerType.ASSOCIATES,
    AMAZON_ACCESS_KEY,
    AMAZON_SECRET_KEY,
    Host.UNITED_STATES,
    Region.UNITED_STATES
  );
  return request.send();
}

export async function searchByItem(keyword: string) {
  const request = new SearchItemsRequest(
    {
      ItemCount: 5,
      Keywords: keyword,
      Condition: "New",
      Resources: [
        "Images.Primary.Medium",
        "ItemInfo.Title",
        "Offers.Listings.Price",
      ],
      Merchant: "Amazon",
    },
    AMAZON_TAG,
    PartnerType.ASSOCIATES,
    AMAZON_ACCESS_KEY,
    AMAZON_SECRET_KEY,
    Host.UNITED_STATES,
    Region.UNITED_STATES
  );
  return request.send();
}

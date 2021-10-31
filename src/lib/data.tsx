const csv2json = require("csvtojson");

export const GOOGLE_SHEET_DATA: string = process.env.GOOGLE_SHEET_DATA || "";

export default async function getData() {
  const url = GOOGLE_SHEET_DATA;
  const csv = "&single=true&output=csv&headers=0";
  const skipFirstRow = "&range=A2:ZZ";
  const result = await fetch(url + csv + skipFirstRow);
  const data = await result.text();
  return csv2json().fromString(data);
}

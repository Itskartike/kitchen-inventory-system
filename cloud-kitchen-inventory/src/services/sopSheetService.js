import Papa from "papaparse";

export async function fetchSOPsFromGoogleSheet(sheetUrlOrId) {
  // Extract the sheet ID from the URL or use the ID directly
  let sheetId = sheetUrlOrId;
  if (sheetUrlOrId.includes("docs.google.com")) {
    const match = sheetUrlOrId.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) sheetId = match[1];
  }
  // Use the first sheet (gid=0)
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=0`;

  const response = await fetch(csvUrl);
  if (!response.ok) throw new Error("Failed to fetch sheet");
  const csv = await response.text();
  const { data } = Papa.parse(csv, { header: true });
  return data;
}
import Post from "../types/post";
import Author from "../types/author";
import PostAndMorePosts from "../types/postAndMorePosts";

const UMBRACO_SERVER_URL = process.env.UMBRACO_SERVER_URL;
const UMBRACO_DELIVERY_API_KEY = process.env.UMBRACO_DELIVERY_API_KEY;
const UMBRACO_API_URL = `${UMBRACO_SERVER_URL}/umbraco/delivery/api/v2/content`;

const performFetch = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `Could not fetch data for URL: ${url} - response status was: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

const fetchSingle = async (slug: string, startItem: string, preview: boolean) =>
  await performFetch(`${UMBRACO_API_URL}/item/${slug}`, {
    method: "GET",
    headers: {
      "Start-Item": startItem,
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });

const fetchAll = async (
  expandAuthor: boolean,
  numberOfPosts: number,
  preview: boolean
) => {
  const expand = expandAuthor ? "properties[author]" : "";
  const take = numberOfPosts ?? 10;
  return await fetchMultiple(
    `fetch=children:/&expand=${expand}&sort=updateDate:desc&take=${take}`,
    "posts",
    preview
  );
};

const fetchMultiple = async (
  query: string,
  startItem: string,
  preview: boolean
) =>
  await performFetch(`${UMBRACO_API_URL}/?${query}`, {
    method: "GET",
    headers: {
      "Start-Item": startItem,
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });

export const fetchpages = async (preview: boolean) => {
  const url = `${UMBRACO_API_URL}?filter=contentType%3Apage`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });
  return response;
};

export const fetchHome = async (preview: boolean) => {
  const url = `${UMBRACO_API_URL}/item/?fields=properties%5B%24all%5D`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });
  return response;
};

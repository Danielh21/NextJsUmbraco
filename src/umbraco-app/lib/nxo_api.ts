import Post from "../types/post";
import Author from "../types/author";
import PostAndMorePosts from "../types/postAndMorePosts";
import pageFolder from "../types/pagesFolder";
import pageRoutingModel from "../types/pageRoutingModel";

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

export const fetchPageFolders = async (preview: boolean) => {
  const url = `${UMBRACO_API_URL}?filter=contentType:pages&skip=0&fields=properties:[id]`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });

  const items = response.items;
  const folders: pageFolder[] = [];
  items.forEach((it) => {
    folders.push({
      id: it.id,
      path: it.route.path,
    });
  });

  return folders;
};

export const fetchSubPagesFromFolder = async (
  folder: pageFolder,
  preview: boolean
) => {
  const url = `${UMBRACO_API_URL}?filter=contentType:page&fields=properties[id]`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
      "Start-Item": folder.id,
    },
  });

  const items = response.items;
  const routingModel: string[] = [];
  items.forEach((it) => {
    let combinedRoute = folder.path + it.route.path.substring(1);
    routingModel.push(combinedRoute);
  });
  return routingModel;
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

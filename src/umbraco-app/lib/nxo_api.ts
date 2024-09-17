import Post from "../types/post";
import Author from "../types/author";
import PostAndMorePosts from "../types/postAndMorePosts";
import pageFolder from "../types/pagesFolder";
import pageRoutingModel from "../types/pageRoutingModel";
import { GridContent, GridType } from "../types/gridType";
import PageLinkContentType from "../types/PageLinkContentType";
import PageType from "../types/pageType";

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

export const fetchByPath = async (preview: boolean, path: string) => {
  const url = `${UMBRACO_API_URL}/item/${path}?fields=properties%5B%24all%5D`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });
  return response;
};

export const fetchById = async (preview: boolean, id: string) => {
  const url = `${UMBRACO_API_URL}/item/${id}?fields=properties%5B%24all%5D`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });
  return response;
};

export const GetMetaDataForGrid = async (
  preview: boolean,
  grid: GridType
): Promise<GridType> => {
  const routesPromises = grid.items.map(async (item) => {
    // Getting metadata for specific items

    // Page Link Content Type Start
    if (item.content.contentType == "pageLink") {
      const pageLinkContent = item.content as PageLinkContentType;
      const idOfPageLink = pageLinkContent.properties.pageContentLink[0].id;
      const pageLinkPageType = (await fetchById(
        preview,
        idOfPageLink
      )) as PageType;
      const metaDescription = pageLinkPageType.properties.metaDescription;
      pageLinkContent.properties.pageContentLink[0].teaserText =
        metaDescription;
      if (pageLinkPageType.route.path == "/") {
        //Exception For Home Path
        pageLinkContent.properties.pageContentLink[0].path = "/";
      } else {
        const parrentPath = pageLinkPageType.route.startItem?.path ?? "";
        pageLinkContent.properties.pageContentLink[0].path =
          parrentPath + pageLinkPageType.route.path;
      }
    }
    // Page Link Content Type End
  });

  await Promise.all(routesPromises);
  return grid;
};
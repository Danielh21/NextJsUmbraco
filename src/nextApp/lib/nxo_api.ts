import {
  PageLinkContentType,
  pageFolder,
  PageLinkCollectionContentType,
  Picture,
  PageType,
  UmbracoContentLinkType,
  GridType,
} from "umbraco-types-package";

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
      route: { ...it.route },
    });
  });

  return folders;
};

export const fetchAllPageTypes = async (preview: boolean) => {
  const url = `${UMBRACO_API_URL}?filter=contentType:page&fields=properties[id]`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
    },
  });

  const items = response.items;
  const routingModel: string[] = [];
  items.forEach((it) => {
    let path = it.route.path;
    routingModel.push(path);
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

export const fetchSiteLayoutProperties = async (
  preview: boolean,
  startItem: string
) => {
  const url = `${UMBRACO_API_URL}?filter=contentType%3AsiteLayout&take=1&fields=properties%5B%24all%5D`;

  var response = await performFetch(url, {
    method: "GET",
    headers: {
      "Api-Key": UMBRACO_DELIVERY_API_KEY,
      Preview: preview ? "true" : "false",
      "Start-Item": startItem,
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

export const fetchChildren = async (preview: boolean, id: string) => {
  const url = `${UMBRACO_API_URL}?fetch=children%3A${id}&fields=properties%5B%24all%5D`;

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
      const teaserText = pageLinkPageType.properties.textTeaser;
      let teaserImage: Picture = null;
      if (pageLinkPageType.properties.imageTeaser) {
        teaserImage = pageLinkPageType.properties?.imageTeaser[0];
      }
      pageLinkContent.properties.pageContentLink[0].teaserText = teaserText;
      pageLinkContent.properties.pageContentLink[0].teaserImage = teaserImage;
      pageLinkContent.properties.pageContentLink[0].path =
        pageLinkPageType.route.path;
    }

    if (item.content.contentType == "pageLinkCollection") {
      const pageCollectionType = item.content as PageLinkCollectionContentType;
      const selectedFolder = pageCollectionType.properties.pageFolder[0];
      const allChilds = await fetchChildren(preview, selectedFolder.id);
      const allChildsAsPageArray = Array.from(allChilds.items) as PageType[];

      pageCollectionType.properties.pagesLink = allChildsAsPageArray.map(
        (it) => {
          const umbracoLink: UmbracoContentLinkType = {
            id: it.id,
            teaserText: it.properties.textTeaser,
            path: it.route.path,
            teaserImage: it.properties.imageTeaser[0],
            updateDate: it.updateDate, //TODO
          };
          return umbracoLink;
        }
      );
    }
  });

  await Promise.all(routesPromises);
  return grid;
};

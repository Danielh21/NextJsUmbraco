import { GridContent } from "./gridType";
import PageLinkContentType from "./PageLinkContentType";
import pageFolder from "./pagesFolder";
import UmbracoContentLinkType from "./UmbracoContentLinkType";

interface PageLinkCollectionContentType extends GridContent {
  properties: {
    pageFolder: pageFolder[];
    pagesLink: UmbracoContentLinkType[];
  };
}

export default PageLinkCollectionContentType;

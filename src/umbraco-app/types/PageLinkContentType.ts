import { GridContent } from "./gridType";
import UmbracoContentLinkType from "./UmbracoContentLinkType";

interface PageLinkContentType extends GridContent {
  properties: {
    linkTitle: string;
    pageContentLink: UmbracoContentLinkType[];
  };
}

export default PageLinkContentType;

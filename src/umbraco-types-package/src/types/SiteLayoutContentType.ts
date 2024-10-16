import { GridContent } from "./gridType";
import PageType from "./pageType";
import Picture from "./picture";
import UmbracoContentLinkType from "./UmbracoContentLinkType";

interface SiteLayoutContentType extends GridContent {
  properties: {
    footerImage: Picture[];
    footerLinks: URLPickerType[];
    navigationItems: PageType[];
    footerText: RichText;
  };
}

interface URLPickerType {
  url: string;
  queryString: string;
  title: string;
  target: string;
  destinationId: string;
  destinationType: string;
  route?: {
    path: string;
    startItem?: {
      id: string;
      path: string;
    };
  };
  linkType: string;
}

export default SiteLayoutContentType;

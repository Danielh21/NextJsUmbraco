import Picture from "./picture";

interface UmbracoContentLinkType {
  id: string;
  updateDate?: string;
  path: string;
  teaserText: string;
  teaserImage?: Picture;
}

export default UmbracoContentLinkType;

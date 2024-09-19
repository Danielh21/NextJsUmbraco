import Picture from "./picture";

interface UmbracoContentLinkType {
  id: string;
  updateDate: Date;
  path: string;
  teaserText: string;
  teaserImage?: Picture;
}

export default UmbracoContentLinkType;

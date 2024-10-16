import { GridContent } from "./gridType";
import Picture from "./picture";

interface HeroContentType extends GridContent {
  properties: {
    headline: string;
    image: Picture[];
  };
}

export default HeroContentType;

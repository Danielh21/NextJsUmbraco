import { GridType } from "./gridType";
import Picture from "./picture";

type PageType = {
  name: string;
  route: {
    path: string;
    startItem?: {
      id: string;
      path: string;
    };
  };
  id: string;
  properties: {
    metaDescription: string;
    metaKeyWord: string;
    textTeaser: string;
    imageTeaser: Picture[];
    grid: GridType;
  };
};

export default PageType;

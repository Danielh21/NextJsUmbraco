import { GridType } from "./gridType";

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
    grid: GridType;
  };
};

export default PageType;

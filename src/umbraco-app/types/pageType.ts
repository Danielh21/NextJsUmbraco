import { GridType } from "./gridType";

type PageType = {
  name: string;
  route: {
    path: string;
  };
  id: string;
  properties: {
    metaDescription: string;
    metaKeyWord: string;
    grid: GridType;
  };
};

export default PageType;

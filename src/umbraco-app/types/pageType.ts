type PageType = {
  name: string;
  route: {
    path: string;
  };
  id: string;
  properties: {
    metaDescription: string;
    metaKeyWord: string;
    grid: Grid;
  };
};

export default PageType;

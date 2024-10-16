type pageFolder = {
  id: string;
  path: string;
  route?: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
};

export default pageFolder;

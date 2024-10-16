import { GridContent } from "./gridType";

interface TextComponentType extends GridContent {
  properties: {
    header: string;
    body: RichText;
  };
}

export default TextComponentType;

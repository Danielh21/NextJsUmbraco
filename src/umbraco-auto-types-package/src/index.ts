import { AliasType } from "./helperModels/AliasType";
import fs from 'fs';
import path from 'path';

const GetAllModels = async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    console.log("Running");

    const response = await fetch("https://localhost:44390/api/schema/document-types", {
        
    });

    const outputDir = path.join(__dirname, '../generatedModels');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const data = await response.json() as AliasType[];
    data.forEach((contentType) => HandleSingleContentType(contentType, outputDir));

    

    console.log(data);
    console.log("Script compiled successfully");
};

GetAllModels();



const HandleSingleContentType = (contentType: AliasType , outputDir: string) => {

  const fileName = `${contentType.alias}.ts`;
  const interfaceName = toPascalCase(contentType.alias);

  const fileContent = `export interface ${interfaceName} {
  // TODO: define real types
  [key: string]: any;
}
`;

  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated ${filePath}`);

function toPascalCase(str: string) {
  return str
    .replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase());
}

}
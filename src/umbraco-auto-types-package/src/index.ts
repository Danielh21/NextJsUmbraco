import { AliasType } from "./helperModels/AliasType";
import fs from 'fs';
import path from 'path';
import {
  hasCustomPropertyCustomModel,
  mapPropertyEditorToType,
} from "./helperModels/AliasMap";

const GetAllModels = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  console.log("Running");

  const response = await fetch(
    "https://localhost:44390/api/schema/document-types",
    {}
  );

  const outputDir = path.join(__dirname, "../generatedModels");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const data = (await response.json()) as AliasType[];
  data.forEach((contentType) =>
    HandleSingleContentType(contentType, outputDir)
  );

  console.log(data);
  console.log("Script compiled successfully");
};

GetAllModels();

const HandleSingleContentType = (contentType: AliasType, outputDir: string) => {
  const fileName = `${contentType.alias}.ts`;
  const interfaceName = toPascalCase(contentType.alias);
  const propertiesArray = contentType.properties.map((p: any) =>
    HandleProperty(p)
  );
  const imports = HandleImports(contentType.properties);

  const fileContent = `${imports.join("\n")}

export interface ${interfaceName} {
  ${propertiesArray.join("\n\t")}
}
`;

  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated ${filePath}`);

  function toPascalCase(str: string) {
    return str.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, "").toUpperCase());
  }
};

const HandleProperty = (prop: any) => {
  const propertyAlias = prop.alias;
  const propType = prop.propertyEditorAlias as string;

  const type = mapPropertyEditorToType(propType);

  if (!type) {
    console.error("Could not map prop", propType);
    return `${propertyAlias} : any;`;
  }

  return `${propertyAlias} : ${type};`;
};

const HandleImports = (props: any) => {
  const importStatements: string[] = [];

  props.forEach((p: any) => {
    const importName = hasCustomPropertyCustomModel(p.propertyEditorAlias);
    if (importName) {
      importStatements.push(
        `import { ${importName} } from "./UmbracoModels/${importName}";`
      );
    }
  });
  return importStatements;
};
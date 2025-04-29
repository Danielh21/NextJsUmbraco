const AliasMap: Record<string, string> = {
    "Umbraco.TextBox": "string",
    "Umbraco.TextArea": "string",
    "Umbraco.Boolean": "boolean",
    'Umbraco.BlockGrid': "string",
    "Umbraco.Integer": "number",
    "Umbraco.DateTime": "Date",
    "Umbraco.MediaPicker": "number", // maybe an ID?
    "Umbraco.ContentPicker": "number", // or custom type
    "Umbraco.TinyMCE": "RichText", // or custom type
  };
  
  export function mapPropertyEditorToType(alias: string): string | null {
    return AliasMap[alias] || null;
  }

const CustomModels : Record<string, string> = { 
    "Umbraco.TinyMCE": "RichText", // or custom type
}

export function hasCustomPropertyCustomModel(alias: string){
    return CustomModels[alias] || null;
}
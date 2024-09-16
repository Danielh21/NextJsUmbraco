export interface GridType {
  gridColumns: number;
  items: GridProperties[];
}

export interface GridProperties {
  rowSpan: number;
  columnSpan: number;
  areaGridColumns: number;
  content: GridContent;
}

export interface GridContent {
  contentType: string;
  id: string;
  properties: any;
}

import React from "react";
import Hero from "./hero";
import {
  HeroContentType,
  PageLinkContentType,
  PageLinkCollectionContentType,
  TextComponentType,
} from "umbraco-types-package";
import { GridProperties, GridType } from "umbraco-types-package";
import TextComponent from "./textComponent";
import PageLinkComponent from "./pageLinkComponent";
import PageLinkCollection from "./pageLinkCollection";

interface GridPros {
  Grid: GridType;
}

const Grid = ({ Grid }: GridPros) => {
  return (
    <div className="flex flex-col gap-6">
      <h2></h2>
      {Grid.items.map((gridItem, inx) => {
        return <div key={inx}>{project(gridItem)}</div>;
      })}
    </div>
  );
};

const project = (gridItem: GridProperties) => {
  switch (gridItem.content.contentType) {
    case "hero":
      return <Hero content={gridItem.content as HeroContentType} />;
    case "text":
      return <TextComponent content={gridItem.content as TextComponentType} />;
    case "pageLink":
      return (
        <PageLinkComponent content={gridItem.content as PageLinkContentType} />
      );
    case "pageLinkCollection":
      return (
        <PageLinkCollection
          content={gridItem.content as PageLinkCollectionContentType}
        />
      );
    default:
      return <h1>No project match</h1>;
  }
};

export default Grid;

import React from "react";
import Hero from "./hero";
import HeroContentType from "../types/heroContentType";
import { GridProperties, GridType } from "../types/gridType";
import TextComponent from "./textComponent";
import TextContentType from "../types/TextContentType";
import PageLinkContentType from "../types/PageLinkContentType";
import PageLinkComponent from "./PageLinkComponent";

interface GridPros {
  Grid: GridType;
}

const Grid = ({ Grid }: GridPros) => {
  return (
    <div className="flex flex-col gap-6">
      <h2></h2>
      {Grid.items.map((gridItem, inx) => {
        return project(gridItem);
      })}
    </div>
  );
};

const project = (gridItem: GridProperties) => {
  switch (gridItem.content.contentType) {
    case "hero":
      return <Hero content={gridItem.content as HeroContentType} />;
    case "text":
      return <TextComponent content={gridItem.content as TextContentType} />;
    case "pageLink":
      return (
        <PageLinkComponent content={gridItem.content as PageLinkContentType} />
      );
    default:
      return <h1>No project match</h1>;
  }
};

export default Grid;

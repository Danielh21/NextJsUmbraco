import React from "react";
import Image from "next/image";
import { PageLinkCollectionContentType } from "umbraco-types-package";
import SingleLink from "./singleLink";

interface PageLinkCollectionProps {
  content: PageLinkCollectionContentType;
}

const PageLinkCollection = ({ content }: PageLinkCollectionProps) => {
  return (
    <div className="flex gap-5 flex-wrap ">
      {content.properties.pagesLink.map((pageLink, inx) => {
        return <SingleLink link={pageLink} key={inx} />;
      })}
    </div>
  );
};

export default PageLinkCollection;

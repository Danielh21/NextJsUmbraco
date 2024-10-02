import React from "react";
import Image from "next/image";
import PageLinkContentType from "../types/PageLinkContentType";
import SingleLink from "./singleLink";

interface PageLinkProps {
  content: PageLinkContentType;
}

function PageLinkComponent({ content }: PageLinkProps) {
  const { properties } = content;
  const link = properties.pageContentLink[0];
  return (
    <div className="flex flex-col gap-5">
      <SingleLink linkTitle={properties.linkTitle} link={link} />
    </div>
  );
}

export default PageLinkComponent;

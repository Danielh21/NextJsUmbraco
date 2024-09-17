import React from "react";
import Image from "next/image";
import PageLinkContentType from "../types/PageLinkContentType";

interface PageLinkProps {
  content: PageLinkContentType;
}

function PageLinkComponent({ content }: PageLinkProps) {
  const { properties } = content;
  const link = properties.pageContentLink[0];
  return (
    <div className="flex flex-col gap-5">
      <h2>Super Link under Here:</h2>
      <a href={link.path}> {properties.linkTitle} </a>

      <div>
        <p>Here is Meta Text about the page: </p>
        <p>{link.teaserText} - </p>
      </div>
    </div>
  );
}

export default PageLinkComponent;

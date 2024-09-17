import React from "react";
import Image from "next/image";
import PageLinkContentType from "../types/PageLinkContentType";

interface PageLinkProps {
  content: PageLinkContentType;
}

function PageLinkComponent({ content }: PageLinkProps) {
  const { properties } = content;
  return (
    <div className="flex flex-col gap-5">
      <h2>Super Link under Here:</h2>
      <a href=""> {properties.linkTitle} </a>
    </div>
  );
}

export default PageLinkComponent;

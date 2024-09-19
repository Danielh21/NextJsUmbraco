import React from "react";
import Image from "next/image";
import PageLinkContentType from "../types/PageLinkContentType";

interface PageLinkProps {
  content: PageLinkContentType;
}

function PageLinkComponent({ content }: PageLinkProps) {
  const { properties } = content;
  const link = properties.pageContentLink[0];
  const umbracoServerURL =
    process.env.UMBRACO_SERVER_URL ?? "http://localhost:15756";
  return (
    <div className="flex flex-col gap-5">
      <a href={link.path}>
        {" "}
        <span className="cursor-pointer text-indigo-400 ">
          {properties.linkTitle}{" "}
        </span>
        <div>
          <p>{link.teaserText}</p>
          {link.teaserImage && (
            <Image
              width={400}
              height={400}
              alt={`Teaser Image`}
              src={umbracoServerURL + link.teaserImage.url}
            />
          )}
        </div>
      </a>
    </div>
  );
}

export default PageLinkComponent;

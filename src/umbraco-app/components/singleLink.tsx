import React from "react";
import UmbracoContentLinkType from "../types/UmbracoContentLinkType";
import Image from "next/image";

interface SingleLinkProps {
  link: UmbracoContentLinkType;
  linkTitle?: string;
}

function SingleLink({ link, linkTitle }: SingleLinkProps) {
  const umbracoServerURL =
    process.env.UMBRACO_SERVER_URL ?? "http://localhost:15756";
  return (
    <a
      className="bg-white shadow-lg shadow-gray-400 py-6 px-5 rounded-lg w-[20%] items-center flex flex-col"
      href={link.path}
    >
      {" "}
      {link.teaserImage && (
        <Image
          width={200}
          height={200}
          alt={`Teaser Image`}
          className="rounded-md mb-2 w-[200px] h-[200px]"
          src={umbracoServerURL + link.teaserImage.url}
        />
      )}
      <p>{link.teaserText}</p>
    </a>
  );
}

export default SingleLink;

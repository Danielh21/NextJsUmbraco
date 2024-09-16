import React from "react";
import HeroContentType from "../types/heroContentType";
import Image from "next/image";

interface HeroProps {
  content: HeroContentType;
}

function Hero({ content }: HeroProps) {
  const { properties } = content;
  const umbracoServerURL =
    process.env.UMBRACO_SERVER_URL ?? "http://localhost:15756";
  const image = properties.image[0];
  return (
    <div>
      <h1>{properties.headline}</h1>
      <Image
        width={2000}
        height={1000}
        alt={`Cover Image for`}
        src={umbracoServerURL + image.url}
      />
    </div>
  );
}

export default Hero;

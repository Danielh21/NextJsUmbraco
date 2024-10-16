import React from "react";
import Image from "next/image";
import { TextComponentType } from "umbraco-types-package";

interface TextProps {
  content: TextComponentType;
}

function TextComponent({ content }: TextProps) {
  const { properties } = content;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-2xl text-center">{properties.header}</h1>
      <div
        className="flex flex-col gap-5"
        dangerouslySetInnerHTML={{ __html: properties.body.markup }}
      />
    </div>
  );
}

export default TextComponent;

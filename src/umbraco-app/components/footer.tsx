import Link from "next/link";
import SiteLayoutContentType from "../types/SiteLayoutContentType";
import Container from "./container";
import Image from "next/image";

interface FooterProps {
  siteLayout?: SiteLayoutContentType;
}

export default function Footer({ siteLayout }: FooterProps) {
  const umbracoServerURL =
    process.env.UMBRACO_SERVER_URL ?? "http://localhost:15756";
  const footerImageUrl =
    umbracoServerURL + siteLayout?.properties?.footerImage[0]?.url;
  const footerLinks = siteLayout?.properties.footerLinks;
  return (
    <footer className="bg-accent-1 border-t border-accent-2 mt-20">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="flex w-full justify-between">
            <div>
              <Image
                width={400}
                height={400}
                alt={`Footer Image`}
                src={footerImageUrl}
              />
            </div>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link, inx) => {
                const finalURL =
                  link.route == null ? link.url : link.route.path;
                return (
                  <Link
                    className="underline text-blue-300"
                    key={inx}
                    href={finalURL}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

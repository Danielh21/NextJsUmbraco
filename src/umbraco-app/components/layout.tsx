import SiteLayoutContentType from "../types/SiteLayoutContentType";
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  metaKeyWord?: string;
  metaDescription?: string;
  children: React.ReactNode;
  siteLayout?: SiteLayoutContentType;
};

export default function Layout({
  preview,
  metaDescription,
  metaKeyWord,
  children,
  siteLayout,
}: Props) {
  return (
    <>
      <Meta metaDescription={metaDescription} metaKeyWord={metaKeyWord} />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer siteLayout={siteLayout} />
    </>
  );
}

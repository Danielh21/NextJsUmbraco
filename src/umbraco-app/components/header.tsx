import Link from "next/link";
import SiteLayoutContentType from "../types/SiteLayoutContentType";

interface HeaderProps {
  siteLayout?: SiteLayoutContentType;
}

export default function Header({ siteLayout }: HeaderProps) {
  const navigationItems = siteLayout?.properties.navigationItems;

  return (
    <div className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 bg-gray-300 p-4">
      <nav className="flex gap-5 pl-4">
        {navigationItems.map((it, inx) => {
          const finalURL = it.route.path;
          return (
            <div key={inx} className="hover:underline">
              <Link href={finalURL}>{it.name}</Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

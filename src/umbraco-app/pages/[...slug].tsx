import { useRouter } from "next/router";
import { NextPage } from "next";
import { fetchPageFolders, fetchSubPagesFromFolder } from "../lib/nxo_api";

const DynamicPage: NextPage = (props: Params) => {
  // const { slug } = router.query;
  const { slug } = props;

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Slug: {slug.map((s) => s + "-")}</p>
    </div>
  );
};

type Params = {
  slug: string[];
};

export async function getStaticPaths({ preview }: { preview: boolean }) {
  const folders = await fetchPageFolders(false);
  let paths: string[] = [];

  const routesPromises = folders.map(async (folder) => {
    const routes = await fetchSubPagesFromFolder(folder, false);
    return routes; // Return the fetched routes
  });

  const allRoutes = await Promise.all(routesPromises);

  paths = paths.concat(...allRoutes);

  console.log(paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  preview,
}: {
  params: Params;
  preview: boolean;
}) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

export default DynamicPage;

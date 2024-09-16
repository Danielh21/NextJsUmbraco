import { NextPage } from "next";
import {
  fetchByPath,
  fetchPageFolders,
  fetchSubPagesFromFolder,
} from "../lib/nxo_api";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { EXAMPLE_TOOL_NAME } from "../lib/constants";
import PageType from "../types/pageType";
import Grid from "../components/grid";

const DynamicPage: NextPage = ({ page }: PageProps) => {
  const gridItems = page.properties.grid;

  return (
    <>
      <Layout preview={true}>
        <Head>
          <title>Next.js Blog Example with {EXAMPLE_TOOL_NAME}</title>
        </Head>
        <Container>
          <h2>{page.properties.metaKeyWord}</h2>
          <Grid Grid={gridItems} />
        </Container>
      </Layout>
    </>
  );
};

type PageProps = {
  page: PageType;
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
  const lastPathOfSlug = params.slug?.pop() ?? "";
  const pageByPath = (await fetchByPath(preview, lastPathOfSlug)) as PageType;
  return {
    props: {
      page: pageByPath,
    },
  };
}

export default DynamicPage;

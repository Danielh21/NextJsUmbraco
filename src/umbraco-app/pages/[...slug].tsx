import { NextPage } from "next";
import {
  fetchAllPageTypes,
  fetchByPath,
  GetMetaDataForGrid,
} from "../lib/nxo_api";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { EXAMPLE_TOOL_NAME } from "../lib/constants";
import PageType from "../types/pageType";
import Grid from "../components/grid";

type PageProps = {
  page: PageType;
  preview: boolean;
};

const DynamicPage: NextPage = ({ page, preview }: PageProps) => {
  const gridItems = page.properties.grid;

  return (
    <>
      <Layout
        metaKeyWord={page.properties.metaDescription}
        metaDescription={page.properties.metaKeyWord}
        preview={preview}
      >
        <Head>
          <title>{`${page.name}`}</title>
        </Head>
        <Container>
          <Grid Grid={gridItems} />
        </Container>
      </Layout>
    </>
  );
};
export async function getStaticPaths({ preview }: { preview: boolean }) {
  const paths = await fetchAllPageTypes(preview);
  console.log(paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(props) {
  const draftMode = props.draftMode ?? false;
  const path = props.params.slug.join("/");
  const pageByPath = (await fetchByPath(draftMode, path)) as PageType;
  pageByPath.properties.grid = await GetMetaDataForGrid(
    draftMode,
    pageByPath.properties.grid
  );
  return {
    props: {
      page: pageByPath,
      preview: draftMode,
    },
  };
}

export default DynamicPage;

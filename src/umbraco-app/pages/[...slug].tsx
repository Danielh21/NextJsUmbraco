import { NextPage } from "next";
import {
  fetchAllPageTypes,
  fetchByPath,
  fetchSiteLayoutProperties,
  GetMetaDataForGrid,
} from "../lib/nxo_api";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import PageType from "../types/pageType";
import Grid from "../components/grid";
import SiteLayoutContentType from "../types/SiteLayoutContentType";

type PageProps = {
  page: PageType;
  preview: boolean;
  siteLayout: SiteLayoutContentType;
};

const DynamicPage: NextPage = ({ page, preview, siteLayout }: PageProps) => {
  const gridItems = page.properties.grid;

  return (
    <>
      <Layout
        metaKeyWord={page.properties.metaDescription}
        metaDescription={page.properties.metaKeyWord}
        preview={preview}
        siteLayout={siteLayout}
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
  const siteLayoutPropeties = await fetchSiteLayoutProperties(
    draftMode,
    pageByPath.route.startItem.id
  );
  const siteLayout = siteLayoutPropeties.items[0] as SiteLayoutContentType;
  return {
    props: {
      page: pageByPath,
      preview: draftMode,
      siteLayout: siteLayout,
    },
  };
}

export default DynamicPage;

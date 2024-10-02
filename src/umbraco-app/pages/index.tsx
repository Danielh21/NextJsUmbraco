import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import {
  fetchHome,
  fetchSiteLayoutProperties,
  GetMetaDataForGrid,
} from "../lib/nxo_api";
import PageType from "../types/pageType";
import Grid from "../components/grid";
import SiteLayoutContentType from "../types/SiteLayoutContentType";

type Props = {
  page: PageType;
  preview: boolean;
  siteLayout: SiteLayoutContentType;
};

export default function Index({ page, preview, siteLayout }: Props) {
  const gridItems = page.properties.grid;

  return (
    <>
      <Layout
        metaKeyWord={page.properties.metaKeyWord}
        metaDescription={page.properties.metaDescription}
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
}

export async function getStaticProps(props) {
  const draftMode = props.draftMode ?? false;
  const homePage = (await fetchHome(draftMode)) as PageType;
  homePage.properties.grid = await GetMetaDataForGrid(
    draftMode,
    homePage.properties.grid
  );
  const siteLayoutPropeties = await fetchSiteLayoutProperties(
    draftMode,
    homePage.id
  );
  const siteLayout = siteLayoutPropeties.items[0] as SiteLayoutContentType;
  return {
    props: {
      page: homePage,
      preview: draftMode,
      siteLayout: siteLayout,
    },
  };
}

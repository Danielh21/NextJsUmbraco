import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { EXAMPLE_TOOL_NAME } from "../lib/constants";
import { fetchHome, GetMetaDataForGrid } from "../lib/nxo_api";
import PageType from "../types/pageType";
import Grid from "../components/grid";

type Props = {
  page: PageType;
  preview: boolean;
};

export default function Index({ page, preview }: Props) {
  const gridItems = page.properties.grid;

  return (
    <>
      <Layout preview={preview}>
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
}

export async function getStaticProps(props) {
  const draftMode = props.draftMode ?? false;
  const homePage = (await fetchHome(draftMode)) as PageType;
  homePage.properties.grid = await GetMetaDataForGrid(
    draftMode,
    homePage.properties.grid
  );
  return {
    props: {
      page: homePage,
      preview: draftMode,
    },
  };
}

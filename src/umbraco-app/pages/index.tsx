import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { EXAMPLE_TOOL_NAME } from "../lib/constants";
import { fetchHome } from "../lib/nxo_api";
import PageType from "../types/pageType";
import Grid from "../components/grid";

type Props = {
  page: PageType;
};

export default function Index({ page }: Props) {
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
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const homePage = (await fetchHome(false)) as PageType;

  return {
    props: {
      page: homePage,
    },
  };
}

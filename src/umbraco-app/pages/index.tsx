import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { EXAMPLE_TOOL_NAME } from "../lib/constants";
import Post from "../types/post";
import { fetchHome } from "../lib/nxo_api";
import PageType from "../types/pageType";

type Props = {
  page: PageType;
};

export default function Index({ page }: Props) {
  return (
    <>
      <Layout preview={true}>
        <Head>
          <title>Next.js Blog Example with {EXAMPLE_TOOL_NAME}</title>
        </Head>
        <Container>
          <h2>{page.properties.metaKeyWord}</h2>
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

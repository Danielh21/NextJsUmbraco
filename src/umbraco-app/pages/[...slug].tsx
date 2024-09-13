import { useRouter } from "next/router";
import { NextPage } from "next";

const DynamicPage: NextPage = (props: Params) => {
  // const { slug } = router.query;
  const { slug } = props;

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

type Params = {
  slug: string;
};

export async function getStaticPaths({ preview }: { preview: boolean }) {
  const paths = ["/some", "/paths"];

  return {
    paths: paths,
    fallback: true,
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

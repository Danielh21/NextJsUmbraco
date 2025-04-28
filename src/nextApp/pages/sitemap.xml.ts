//pages/sitemap.xml.js

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site

  const umbracoURl = process.env.UMBRACO_SERVER_URL;

  const request = await fetch(`${umbracoURl}/sitemap`);
  const sitemap = await request.text();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

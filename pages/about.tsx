import Layout from "../components/layout";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import Head from "next/head";
import fetch from "node-fetch";

export const getStaticProps = async () => {
  const data = await (await fetch('https://api.lemonos.org/wp-json/wp/v2/pages/?slug=about&_fields=title,excerpt,content')).json();
  return { props: { data: data[0] } }
}

const AboutPage: FunctionComponent<{
  data: {
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
  }
}> = ({ data }) => (
  <Layout>
    <Head>
      <title>{data.title.rendered}</title>
      <meta name='description' />
    </Head>
    <article className="prose max-w-screen-md mx-auto p-4" dangerouslySetInnerHTML={{ __html: data.content.rendered }}></article>
  </Layout>
);

export default AboutPage;

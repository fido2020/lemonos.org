import Head from "next/head";
import React from "react";
import Layout from "../components/layout";

const Page404 = () => (
  <Layout>
    <Head>
      <title>Page Not Found</title>
    </Head>
    <div className="h-full flex justify-center text-center px-4 items-center">
      <h1 className="text-6xl my-32">Page not found</h1>
    </div>
  </Layout>
);

export default Page404;

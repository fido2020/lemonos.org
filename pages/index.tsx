import Head from "next/head";
import React, { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import LocalDate from "../components/date";
import Image from "next/image";
import instance from "../agent";

interface Post {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string; protected: boolean };
}

interface ListingProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<ListingProps> = async (context) => {
  const posts: Post[] = await (
    await fetch(
      "https://api.lemonos.org/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date"
    )
  ).json();
  return { props: { posts }, revalidate: 3600 };
};

const Home: FunctionComponent<ListingProps> = (props) => (
  <Layout hideLogo>
    <div className="mx-auto max-w-md prose p-4">
      <Image src="/logo.png" width={1024} height={1024 * (6 / 25)} />
    </div>
    <div className="mx-auto max-w-screen-md xl:max-w-screen-lg prose p-4">
      <Image src="/screenshot.png" width={1024} height={1024 * (9 / 16)} />
    </div>
    <Head>
      <title>Lemon OS</title>
      <meta name='description' content='Lemon OS is a hobbyist UNIX-like operating system for the x86_64 platform.' />
      <meta name='og:image' content={"https://lemonos.now.sh/_next/image?url=%2Fscreenshot.png&w=1200&q=75"} />
      <meta name='twitter:image' content={"https://lemonos.now.sh/_next/image?url=%2Fscreenshot.png&w=1200&q=75"} />
    </Head>
    <div className="">
      {props.posts?.map((post: Post, n) => {
        const date = new Date(post.date);
        return (
          <Link
            href={`/${date.getFullYear()}/${date.getMonth() + 1
              }/${date.getDate()}/${post.slug}`}
            key={post.id}
          >
            <a
              className={`mx-auto block py-8 md:py-16 bg-white transform transition-all cursor-pointer ${n + 1 < props.posts.length ? "border-b-2" : ""
                }`}
            >
              <h2 className="mx-auto px-6 max-w-screen-md text-3xl sm:text-5xl font-semibold mb-4">
                {post.title?.rendered}
              </h2>
              <p className="my-2 mx-auto px-6 max-w-screen-md ">
                <LocalDate date={new Date(post.date)} />
              </p>
              <article
                className="prose px-6 max-w-screen-md mx-auto"
                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
              />
            </a>
          </Link>
        );
      })}
    </div>
  </Layout>
);

export default Home;

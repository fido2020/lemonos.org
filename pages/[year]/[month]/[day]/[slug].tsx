import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Layout from "../../../../components/layout";

import { useRouter } from "next/router";
import LocalDate from "../../../../components/date";
import Head from "next/head";
import instance from "../../../../agent";

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const posts = (await instance.get('https://api.lemonos.org/wp-json/wp/v2/posts?_fields=date,slug')).data;

  return {
    paths: posts.map((post) => {
      const date = new Date(post.date);
      return `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${post.slug
        }`;
    }),
    fallback: true,
  };
};

interface PostProps {
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  try {
    const after = new Date(
      `${context.params.year}-${context.params.month}-${context.params.day}`
    ).toISOString();
    const params = [
      "per_page=1",
      "orderby=date",
      "order=asc",
      "_fields=title.rendered,content.rendered,date,excerpt",
      `after=${after}`,
      `slug=${encodeURIComponent(context.params.slug.toString())}`,
    ];
    const postData: PostProps[] = (await instance.get(`https://api.lemonos.org/wp-json/wp/v2/posts/?` + params.join("&"))).data

    return postData.length == 1
      ? { props: { ...postData[0] } }
      : { notFound: true };
  } catch (err) {
    console.error(err)
    return { notFound: true };
  }
};

const PostPage: React.FunctionComponent<PostProps> = (props) => {
  const router = useRouter();
  if (router.isFallback)
    return (
      <Layout>
        <Head>
          <title>Lemon OS</title>
        </Head>
        <div className="max-w-screen-md mx-auto p-4 md:py-8 animate-pulse ">
          <h1 className="h-8 md:h-20 bg-gray-200  mb-4 rounded-lg" />
          <div
            className="grid mb-4 gap-2"
            style={{
              gridTemplateColumns: "min-content auto",
              gridTemplateRows: " auto 12fr 8fr auto",
            }}
          >
            <p className="w-16 h-16 bg-gray-100 rounded-full row-span-4 col-start-1"></p>
            <p className="w-48 h-6 bg-gray-100  rounded-lg row-start-2 col-start-2"></p>
            <p className="w-12 h-4 bg-gray-100 rounded-lg row-start-3 col-start-2"></p>
          </div>

          <p className="w-48 h-8 bg-gray-100 mb-4 rounded-lg"></p>
          <div className={"bg-purple-100 h-96 flex-1 rounded-lg mb-4"}></div>
          <div className="grid grid-cols-5 gap-4">
            <div
              className={"bg-blue-100 h-72 col-span-2 flex-1 rounded-lg mb-4"}
            ></div>
            <div
              className={"bg-green-100 h-72 col-span-3 flex-1 rounded-lg mb-4"}
            ></div>
          </div>
          <div className={"bg-yellow-100 h-64 flex-1 rounded-lg mb-4"}></div>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <Head>
        <title>{props.title?.rendered}</title>
        <meta name="description" content={props.excerpt?.rendered} />
      </Head>
      <div className="max-w-screen-md mx-auto p-4 md:py-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4">
          <span dangerouslySetInnerHTML={{ __html: props.title?.rendered }} />
        </h1>
        <p className="text-xl">
          <LocalDate date={new Date(props.date)} />
        </p>
        <div className={"prose max-w-none"}>
          <article
            dangerouslySetInnerHTML={{ __html: props.content?.rendered }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

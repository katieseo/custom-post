import type { NextPage } from "next";
import Head from "next/head";
import Post from "../components/Post";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mini Project</title>
        <meta name="description" content="mini project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Post />
    </>
  );
};

export default Home;

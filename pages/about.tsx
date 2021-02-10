import Layout from "../components/layout";
import Image from "next/image";
import React from "react";
import Head from "next/head";

const AboutPage = () => (
  <Layout>
    <Head>
      <title>About Lemon OS</title>
    </Head>
    <div className="mx-auto max-w-screen-md xl:max-w-screen-lg prose p-4">
      <Image src="/screenshot.png" width={1024} height={1024 * (9 / 16)} />
    </div>
    <article className="prose max-w-screen-md mx-auto p-4">
      <h1 className="title">About Lemon OS</h1>{" "}
      <p>
        Lemon OS is a hobbyist UNIX-like operating system for the x86_64
        platform.
      </p>
      <p>
        <strong>Features</strong>
      </p>
      <ul>
        <li>Symmetric Multiprocessing (SMP)</li>
        <li>Window Manager/Server (LemonWM)</li>
        <li>Ext2 filesystem support</li>
        <li>Support for IDE and AHCI devices</li>
        <li>Dynamic Linking</li>
        <li>Terminal Emulator w/ ANSI escape code support</li>
        <li>
          <a
            href="https://github.com/managarm/mlibc/"
            data-type="URL"
            data-id="https://github.com/managarm/mlibc/"
          >
            mlibc
          </a>{" "}
          C library support
        </li>
      </ul>
      <p>
        <strong>Ports/Supported Software</strong>
      </p>
      <ul>
        <li>DOOM</li>
        <li>Gnuboy</li>
        <li>Freetype</li>
        <li>Libpng</li>
        <li>Binutils</li>
      </ul>
      <p />
    </article>
  </Layout>
);

export default AboutPage;

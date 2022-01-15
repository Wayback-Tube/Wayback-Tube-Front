import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // General info about the site
    const siteDescription = "";
    const siteFavicon = "/img/favicon.png";

    return (
      <Html className="">
        <Head>
          <meta name="description" content={siteDescription} />
          <link rel="icon" href={siteFavicon} />
        </Head>
        <body className="bg-light-01dp text-light-text dark:bg-dark-01dp dark:text-dark-text font-light overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

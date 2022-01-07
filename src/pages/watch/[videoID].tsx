import { APIVideo } from "helpers/api";
import Image from "next/image";
import Head from "next/head";

type Props = {
  video: APIVideo;
};

function prettyNumber(number: number): string {
  return number.toLocaleString();
}

function prettyDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export default function Watch({ video }: Props): JSX.Element {
  const shortDescription =
    video.youtube.description.length < 150
      ? video.youtube.description
      : video.youtube.description.substring(0, 147) + "...";

  return (
    <>
      <Head>
        <title>{video.youtube.title}</title>
        <meta property="og:site_name" content="Wayback Tube" />
        <meta
          property="og:url"
          content={`${process.env.NEXTAUTH_URL}/watch/${video.id}`}
        />
        <meta property="og:title" content={video.youtube.title} />
        <meta property="og:image" content={video.file.thumbnail?.url} />
        <meta property="og:image:width" content={video.file.thumbnail?.width} />
        <meta
          property="og:image:height"
          content={video.file.thumbnail?.height}
        />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={video.file.videoUrl} />
        <meta property="og:video:width" content={video.file.width} />
        <meta property="og:video:height" content={video.file.height} />
        <meta property="name" content={video.youtube.title} />
        <meta property="description" content={shortDescription} />
      </Head>

      <div className="grid w-screen place-content-center ">
        <div className="">
          <video
            className="w-full"
            controls
            crossOrigin="staticwaybacktube.r-entries.com"
            autoPlay
          >
            <source src={video.file.videoUrl} type="video/mp4" />
            {video.file.subtitles.map((subtitle) => (
              <track
                key={subtitle.languageCode}
                src={subtitle.url}
                kind="subtitles"
                srcLang={subtitle.languageCode}
                label={subtitle.language}
              />
            ))}
          </video>
          <div className="grid grid-flow-col place-content-start gap-4">
            <h1 className="text-2xl">{video.youtube.title}</h1>
            <p>{video.youtube.category}</p>
            {video.youtube.is360 ? <p>360</p> : ""}
            {video.youtube.is3D ? <p>3D</p> : ""}
            {video.youtube.isCC ? <p>Creative Commons</p> : ""}
            {video.youtube.isForKids ? <p>Kids</p> : ""}
            {video.youtube.isUnlisted ? <p>Unlisted</p> : ""}
            {video.file.isHDR ? <p>HDR</p> : ""}
          </div>
          <div className="grid grid-flow-col gap-4">
            <p>
              {prettyNumber(video.youtube.viewCount)} views -{" "}
              {prettyNumber(video.youtube.commentCount)} comments -{" "}
              {prettyDate(video.youtube.publishedAt)}
            </p>
            <p>{video.youtube.likeCount} likes</p>
            <button>Download</button>
          </div>
          <hr />
          <div>
            <div className="w-8">
              <Image
                src={video.youtube.channel.thumbnail.url}
                width={video.youtube.channel.thumbnail.width}
                height={video.youtube.channel.thumbnail.height}
                alt="Channel thumbnail"
              />
            </div>
            <h2>{video.youtube.channel.title}</h2>
            <p>
              {prettyNumber(video.youtube.channel.subscriberCount)} suscribers
            </p>
            <p>{video.youtube.description}</p>
          </div>

          <div>
            <h3>Thumbnail</h3>
            {video.file.thumbnail ? (
              <div className="grid grid-cols-2">
                <div className="w-80">
                  <Image
                    src={video.file.thumbnail.url}
                    width={video.file.thumbnail.width}
                    height={video.file.thumbnail.height}
                    alt="Channel thumbnail"
                  />
                </div>
                <div>
                  <p>Width: {video.file.thumbnail.width}</p>
                  <p>Height: {video.file.thumbnail.height}</p>
                  <a href={video.file.thumbnail.url}>
                    <button>Download</button>
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <h3>Channel details</h3>
            <div className="grid grid-cols-2">
              <div className="w-80">
                <Image
                  src={video.youtube.channel.thumbnail.url}
                  width={video.youtube.channel.thumbnail.width}
                  height={video.youtube.channel.thumbnail.height}
                  alt="Channel thumbnail"
                />
              </div>
              <div>
                <p>Width: {video.youtube.channel.thumbnail.width}</p>
                <p>Height: {video.youtube.channel.thumbnail.height}</p>
                <a href={video.youtube.channel.thumbnail.url}>
                  <button>Download</button>
                </a>
              </div>
              <div>
                <p>Videos: {prettyNumber(video.youtube.channel.videoCount)}</p>
                <p>Views: {prettyNumber(video.youtube.channel.viewCount)}</p>
              </div>
              <div>
                <p>
                  Created at: {prettyDate(video.youtube.channel.publishedAt)}
                </p>
                {video.youtube.channel.customURL ? (
                  <a
                    href={`https://youtube.com/c/${video.youtube.channel.customURL}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>
                      Custom URL: https://youtube.com/c/
                      {video.youtube.channel.customURL}
                    </p>
                  </a>
                ) : (
                  ""
                )}
                <p>{video.youtube.channel.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoID = context.params.videoID;
  if (videoID) {
    console.log(`${process.env.NEXTAUTH_URL}/api/videos/${videoID}`);

    fetch(`${process.env.NEXTAUTH_URL}/api/videos/${videoID}`, {
      method: "GET",
    });

    const url = `${process.env.NEXTAUTH_URL}/api/videos/${videoID}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      props: { video: data },
    };
  }
};

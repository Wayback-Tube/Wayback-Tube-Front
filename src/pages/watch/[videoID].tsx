/* eslint-disable @next/next/no-img-element */
import { APIVideo, APIVideoPreview } from "helpers/api";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  fetcher,
  fetcherPOST,
  prettyDate,
  prettyDateTime,
  prettyDateTimeDiff,
  prettyDuration,
  prettyNumber,
} from "helpers/tools";
import BubbleLabel from "components/BubbleLabel";
import Link from "next/link";
import VideoError from "components/VideoError";
import { useState } from "react";

type Props = {
  video: APIVideo;
};

export default function Watch({ video }: Props): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();

  // Get the list of videos
  const { data, error } = useSWR("/api/videos/", fetcher);

  // Request video archival
  const [archiveId, setArchiveId] = useState<string | string[] | undefined>("");
  const { data: dataPost, error: errorPost } = useSWR(
    archiveId ? [`/api/videos/${archiveId}`, session?.sessionToken] : null,
    fetcherPOST
  );

  const videoPreviews: APIVideoPreview[] = data;
  if (archiveId && dataPost) router.reload();

  return (
    <>
      {video.id ? (
        <Head>
          <title>{video.youtube.title}</title>
          <meta property="og:site_name" content="Wayback Tube" />
          <meta
            property="og:url"
            content={`${process.env.NEXTAUTH_URL}/watch/${video.id}`}
          />
          <meta property="og:title" content={video.youtube.title} />
          <meta property="og:image" content={video.file.thumbnail?.url} />
          <meta
            property="og:image:width"
            content={video.file.thumbnail?.width.toString()}
          />
          <meta
            property="og:image:height"
            content={video.file.thumbnail?.height.toString()}
          />
          <meta
            property="og:description"
            content={
              video.youtube.description.length < 150
                ? video.youtube.description
                : video.youtube.description.substring(0, 147) + "..."
            }
          />
          <meta property="og:type" content="video.other" />
          {video.file.videoUrl ? (
            <meta property="og:video" content={video.file.videoUrl} />
          ) : (
            ""
          )}

          <meta
            property="og:video:width"
            content={video.file.width?.toString()}
          />
          <meta
            property="og:video:height"
            content={video.file.height?.toString()}
          />
          <meta property="name" content={video.youtube.title} />
          <meta
            property="description"
            content={
              video.youtube.description.length < 150
                ? video.youtube.description
                : video.youtube.description.substring(0, 147) + "..."
            }
          />
        </Head>
      ) : (
        ""
      )}

      <div className="grid place-content-center">
        <div className="grid grid-cols-[auto_auto] max-w-[110rem] gap-8 p-4 place-items-start">
          <div className="grid gap-4 ">
            <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg rounded-xl">
              {video.id ? (
                video.file.videoUrl ? (
                  <video
                    className="w-full rounded-lg"
                    controls
                    src={video.file.videoUrl}
                    crossOrigin={process.env.NEXT_PUBLIC_STATIC_URL}
                    poster={video.file.thumbnail?.url}
                    preload="auto"
                    autoPlay
                  >
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
                ) : (
                  <VideoError />
                )
              ) : (
                <iframe
                  className="aspect-video rounded-lg w-full"
                  src={`https://www.youtube-nocookie.com/embed/${router.query.videoID}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}

              <div className="p-6">
                <div className="inline-grid grid-flow-col place-content-start items-center mb-1 gap-2">
                  <h1 className="text-2xl mr-4">
                    {video.id ? video.youtube.title : "Unarchived Video"}
                  </h1>

                  {video.id ? (
                    <BubbleLabel text={video.youtube?.category} />
                  ) : (
                    ""
                  )}

                  {video.youtube?.is360 ? <BubbleLabel text="360" /> : ""}
                  {video.youtube?.is3D ? <BubbleLabel text="3D" /> : ""}
                  {video.youtube?.isCC ? (
                    <BubbleLabel text="Creative Commons" />
                  ) : (
                    ""
                  )}
                  {video.youtube?.isForKids ? <BubbleLabel text="Kids" /> : ""}
                  {video.youtube?.isUnlisted ? (
                    <BubbleLabel text="Unlisted" />
                  ) : (
                    ""
                  )}
                  {video.file?.isHDR ? <BubbleLabel text="HDR" /> : ""}
                </div>

                <div className="grid grid-flow-col gap-4">
                  <div className="grid grid-flow-col place-content-start gap-4">
                    <p className="inline-grid grid-flow-col gap-2 place-content-start">
                      <span className="material-icons !text-base">
                        visibility
                      </span>
                      {video.id
                        ? video.youtube?.viewCount
                          ? prettyNumber(video.youtube?.viewCount)
                          : "Views disabled"
                        : prettyNumber(undefined)}
                    </p>

                    <p className="inline-grid grid-flow-col gap-2 place-content-start">
                      <span className="material-icons !text-base">
                        chat_bubble
                      </span>
                      {video.id
                        ? video.youtube?.commentCount
                          ? prettyNumber(video.youtube?.commentCount)
                          : "Comments disabled"
                        : prettyNumber(undefined)}
                    </p>

                    <p className="inline-grid grid-flow-col gap-2 place-content-start">
                      <span className="material-icons !text-base">
                        cloud_upload
                      </span>
                      {prettyDate(video.youtube?.publishedAt)}
                    </p>

                    <p className="inline-grid grid-flow-col gap-2 place-content-start">
                      <span className="material-icons !text-base">
                        inventory
                      </span>
                      {prettyDate(video.wayback?.lastUpdatedAt)}
                    </p>
                  </div>

                  <div className="place-self-end grid grid-flow-col place-items-center gap-4">
                    <p className="inline-grid grid-flow-col gap-2 place-content-start">
                      <span className="material-icons !text-base">
                        thumb_up
                      </span>
                      {video.id
                        ? video.youtube?.likeCount
                          ? prettyNumber(video.youtube?.likeCount)
                          : "Likes disabled"
                        : prettyNumber(undefined)}
                    </p>

                    {video.file?.videoUrl ? (
                      <a
                        className="inline-grid grid-flow-col gap-2 place-content-start"
                        href={video.file?.videoUrl}
                      >
                        <span className="material-icons">download</span>
                        Download
                      </a>
                    ) : archiveId && !dataPost ? (
                      <a
                        className="inline-grid grid-flow-col gap-2 place-content-start"
                        onClick={() => setArchiveId(router.query.videoID)}
                      >
                        <span className="material-icons">cloud_upload</span>
                        Loading...
                      </a>
                    ) : session ? (
                      <a
                        className="inline-grid grid-flow-col gap-2 place-content-start cursor-pointer"
                        onClick={() => setArchiveId(router.query.videoID)}
                      >
                        <span className="material-icons">cloud_upload</span>
                        Archive it
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl grid grid-flow-col gap-4 place-content-start pb-8 pr-12">
              <div className="w-12">
                {video.id ? (
                  <img
                    className="rounded-full shadow-lg"
                    src={video.youtube.channel.thumbnail.url}
                    alt="Channel thumbnail"
                  />
                ) : (
                  <div className="dark:bg-dark-24dp bg-light-24dp w-full aspect-square rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-acc uppercase text-accent dark:text-accent">
                  {video.id ? video.youtube?.channel.title : "Channel's Name"}
                </h3>
                <p className="text-light-emphasis dark:text-dark-emphasis">
                  {prettyNumber(video.youtube?.channel.subscriberCount)}{" "}
                  suscribers
                </p>
                {video.id ? (
                  video.youtube?.description.length < 300 ? (
                    <p className="mt-4">{video.youtube?.description}</p>
                  ) : (
                    <>
                      <p className="mt-4">
                        {video.youtube?.description.substring(0, 300) + "..."}
                      </p>
                      <a href="#">Show more</a>
                    </>
                  )
                ) : session ? (
                  "This video has not yet being archived. Click on the Archive button above to archive it!"
                ) : (
                  "This video has not yet being archived. In order to archive the video, you have to Sign in!"
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl">
                <h3 className="mb-4 text-accent dark:text-accent uppercase">
                  Thumbnail
                </h3>

                <div className="grid gap-4">
                  <div className="w-48 aspect-video relative">
                    {video.file?.thumbnail ? (
                      <img
                        className="rounded-lg"
                        src={video.file.thumbnail.url}
                        alt="Channel thumbnail"
                      />
                    ) : (
                      <div className="rounded-lg bg-light-24dp dark:bg-dark-24dp w-full aspect-video"></div>
                    )}
                  </div>

                  <div className="grid gap-2 content-start grid-cols-[auto_auto] place-content-start gap-x-4">
                    <h4>Width</h4>
                    <p>{prettyNumber(video.file?.thumbnail?.width)} px</p>
                    <h4>Height</h4>
                    <p>{prettyNumber(video.file?.thumbnail?.height)} px</p>
                    <a
                      className="col-span-2 mt-2"
                      href={video.file?.thumbnail?.url}
                    >
                      <button>Download</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl">
                <h3 className="mb-4 text-accent dark:text-accent uppercase">
                  Livestream
                </h3>
                <div className="grid">
                  <h4>Scheduled Start</h4>
                  <p>{prettyDateTime(video.youtube?.liveScheduledStartTime)}</p>
                  <h4>Scheduled End</h4>
                  <p>{prettyDateTime(video.youtube?.liveScheduledEndTime)}</p>
                  <h4>Actual Start</h4>
                  <p>
                    {prettyDateTimeDiff(
                      video.youtube?.liveScheduledStartTime,
                      video.youtube?.liveActualStartTime
                    )}
                  </p>
                  <h4>Actual End</h4>
                  <p>
                    {prettyDateTimeDiff(
                      video.youtube?.liveScheduledEndTime,
                      video.youtube?.liveActualEndTime
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl">
              <h3 className="mb-4 text-accent dark:text-accent uppercase">
                Channel details
              </h3>
              <div className="grid grid-cols-[auto_1fr] gap-8">
                <div className="grid gap-4">
                  <div className="w-48 aspect-square relative">
                    {video.id ? (
                      <img
                        className="rounded-lg"
                        src={video.youtube?.channel.thumbnail.url}
                        alt="Channel thumbnail"
                      />
                    ) : (
                      <div className="rounded-lg bg-light-24dp dark:bg-dark-24dp w-full aspect-square"></div>
                    )}
                  </div>
                  <div className="grid gap-2 content-start grid-cols-[auto_auto] place-content-start gap-x-4">
                    <h4>Width</h4>
                    <p>
                      {prettyNumber(video.youtube?.channel.thumbnail.width)} px
                    </p>
                    <h4>Height</h4>
                    <p>
                      {prettyNumber(video.youtube?.channel.thumbnail.height)} px
                    </p>
                    <a
                      className="col-span-2  mt-2"
                      href={video.youtube?.channel.thumbnail.url}
                    >
                      <button>Download</button>
                    </a>
                  </div>
                </div>
                <div className="grid gap-2 content-start grid-cols-[auto_1fr] place-content-start gap-x-6">
                  <h4>Videos</h4>
                  <p>{prettyNumber(video.youtube?.channel.videoCount)}</p>
                  <h4>Views</h4>
                  <p>{prettyNumber(video.youtube?.channel.viewCount)}</p>
                  <h4>Created at</h4>
                  <p>{prettyDate(video.youtube?.channel.publishedAt)}</p>
                  {video.youtube?.channel.customURL ? (
                    <>
                      <h4>Custom URL</h4>
                      <a
                        href={`https://youtube.com/c/${video.youtube?.channel.customURL}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>
                          https://youtube.com/c/
                          {video.youtube?.channel.customURL}
                        </p>
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                  <p className="col-span-2">
                    {video.youtube?.channel.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg grid gap-y-4 place-content-start  p-6 rounded-xl w-[25rem]">
            <h3 className="uppercase text-accent dark:text-accent text-center font-bold mb-2">
              Latest Videos
            </h3>
            {error ? (
              <div>failed to load</div>
            ) : !videoPreviews ? (
              ""
            ) : (
              <>
                {videoPreviews.map((video) => (
                  <Link key={video.id} href={video.watchUrl} passHref>
                    <div className="grid grid-cols-2 gap-x-4 cursor-pointer">
                      <div className="grid relative">
                        {video.thumbnail ? (
                          <>
                            <img
                              className="rounded-md"
                              src={video.thumbnail.url}
                              alt={video.title}
                            />
                            {video.duration ? (
                              <p className="absolute bottom-1 right-1 bg-light-00dp dark:bg-dark-00dp px-2 rounded-full text-xs text-light-emphasis dark:text-dark-emphasis">
                                {prettyDuration(video.duration)}
                              </p>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <VideoError />
                        )}
                      </div>

                      <div>
                        <p className="text-light-emphasis dark:text-dark-emphasis font-bold max-line">
                          {video.title.length > 30
                            ? video.title.substring(0, 27) + "..."
                            : video.title}
                        </p>
                        <p className="text-sm">{video.channel.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const videoID = context.params.videoID;
  if (videoID) {
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
}

/* eslint-disable @next/next/no-img-element */
import { APIVideo, APIVideoPreview } from "helpers/api";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  fetcher,
  prettyDate,
  prettyDateTime,
  prettyDateTimeDiff,
  prettyDuration,
  prettyNumber,
} from "helpers/tools";
import BubbleLabel from "components/BubbleLabel";
import Link from "next/link";
import VideoError from "components/VideoError";

export default function Watch(): JSX.Element {
  const router = useRouter();
  const { videoID } = router.query;

  const url = `/api/videos/${videoID}`;
  const { data, error } = useSWR(url, fetcher);

  const url2 = "/api/videos/";
  const { data: data2, error: error2 } = useSWR(url2, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div></div>;

  const video: APIVideo = data;
  const videoPreviews: APIVideoPreview[] = data2;

  if (!video.id) {
    return <div>failed to load</div>;
  } else {
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
          <meta
            property="og:image:width"
            content={video.file.thumbnail?.width.toString()}
          />
          <meta
            property="og:image:height"
            content={video.file.thumbnail?.height.toString()}
          />
          <meta property="og:description" content={shortDescription} />
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
          <meta property="description" content={shortDescription} />
        </Head>

        <div className="grid place-content-center">
          <div className="grid grid-cols-[auto_auto] max-w-[110rem] gap-8 p-4 place-items-start">
            <div className="grid gap-4 ">
              <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg rounded-xl">
                {video.file.videoUrl ? (
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
                  <VideoError/>
                )}

                <div className="p-6">
                  <div className="inline-grid grid-flow-col place-content-start items-center mb-1 gap-2">
                    <h1 className="text-2xl mr-4">{video.youtube.title}</h1>

                    <BubbleLabel text={video.youtube.category} />

                    {video.youtube.is360 ? <BubbleLabel text="360" /> : ""}
                    {video.youtube.is3D ? <BubbleLabel text="3D" /> : ""}
                    {video.youtube.isCC ? (
                      <BubbleLabel text="Creative Commons" />
                    ) : (
                      ""
                    )}
                    {video.youtube.isForKids ? <BubbleLabel text="Kids" /> : ""}
                    {video.youtube.isUnlisted ? (
                      <BubbleLabel text="Unlisted" />
                    ) : (
                      ""
                    )}
                    {video.file.isHDR ? <BubbleLabel text="HDR" /> : ""}
                  </div>

                  <div className="grid grid-flow-col gap-4">
                    <div className="grid grid-flow-col place-content-start gap-4">
                      <p className="inline-grid grid-flow-col gap-2 place-content-start">
                        <span className="material-icons !text-base">
                          visibility
                        </span>
                        {video.youtube.viewCount
                          ? prettyNumber(video.youtube.viewCount)
                          : "Views disabled"}
                      </p>

                      <p className="inline-grid grid-flow-col gap-2 place-content-start">
                        <span className="material-icons !text-base">
                          chat_bubble
                        </span>
                        {video.youtube.commentCount
                          ? prettyNumber(video.youtube.commentCount)
                          : "Comments disabled"}
                      </p>

                      <p className="inline-grid grid-flow-col gap-2 place-content-start">
                        <span className="material-icons !text-base">
                          cloud_upload
                        </span>
                        {prettyDate(video.youtube.publishedAt)}
                      </p>

                      <p className="inline-grid grid-flow-col gap-2 place-content-start">
                        <span className="material-icons !text-base">
                          inventory
                        </span>
                        {prettyDate(video.wayback.lastUpdatedAt)}
                      </p>
                    </div>

                    <div className="place-self-end grid grid-flow-col place-items-center gap-4">
                      {video.youtube.likeCount ? (
                        <p className="inline-grid grid-flow-col gap-2 place-content-start">
                          <span className="material-icons !text-base">
                            thumb_up
                          </span>
                          {prettyNumber(video.youtube.likeCount)}
                        </p>
                      ) : (
                        <p>Likes disabled</p>
                      )}
                      {video.file.videoUrl ? (
                        <a
                          className="inline-grid grid-flow-col gap-2 place-content-start"
                          href={video.file.videoUrl}
                        >
                          <span className="material-icons">download</span>
                          Download
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
                  <img
                    className="rounded-full shadow-lg"
                    src={video.youtube.channel.thumbnail.url}
                    alt="Channel thumbnail"
                  />
                </div>
                <div>
                  <h3 className="text-acc uppercase text-accent dark:text-accent">
                    {video.youtube.channel.title}
                  </h3>
                  <p className="text-light-emphasis dark:text-dark-emphasis">
                    {prettyNumber(video.youtube.channel.subscriberCount)}{" "}
                    suscribers
                  </p>
                  {video.youtube.description.length < 300 ? (
                    <p className="mt-4">{video.youtube.description}</p>
                  ) : (
                    <>
                      <p className="mt-4">
                        {video.youtube.description.substring(0, 300) + "..."}
                      </p>
                      <a href="#">Show more</a>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl">
                  <h3 className="mb-4 text-accent dark:text-accent uppercase">
                    Thumbnail
                  </h3>
                  {video.file.thumbnail ? (
                    <div className="grid gap-4">
                      <div className="w-48 aspect-video relative">
                        <img
                          className="rounded-lg"
                          src={video.file.thumbnail.url}
                          alt="Channel thumbnail"
                        />
                      </div>

                      <div className="grid gap-2 content-start grid-cols-[auto_auto] place-content-start gap-x-4">
                        <h4>Width</h4>
                        <p>{video.file.thumbnail.width} px</p>
                        <h4>Height</h4>
                        <p>{video.file.thumbnail.height} px</p>
                        <a
                          className="col-span-2 mt-2"
                          href={video.file.thumbnail.url}
                        >
                          <button>Download</button>
                        </a>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg p-6 rounded-xl">
                  <h3 className="mb-4 text-accent dark:text-accent uppercase">
                    Livestream
                  </h3>
                  <div className="grid">
                    <h4>Scheduled Start</h4>
                    <p>
                      {prettyDateTime(video.youtube.liveScheduledStartTime)}
                    </p>
                    <h4>Scheduled End</h4>
                    <p>{prettyDateTime(video.youtube.liveScheduledEndTime)}</p>
                    <h4>Actual Start</h4>
                    <p>
                      {prettyDateTimeDiff(
                        video.youtube.liveScheduledStartTime,
                        video.youtube.liveActualStartTime
                      )}
                    </p>
                    <h4>Actual End</h4>
                    <p>
                      {prettyDateTimeDiff(
                        video.youtube.liveScheduledEndTime,
                        video.youtube.liveActualEndTime
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
                      <img
                        className="rounded-lg"
                        src={video.youtube.channel.thumbnail.url}
                        alt="Channel thumbnail"
                      />
                    </div>
                    <div className="grid gap-2 content-start grid-cols-[auto_auto] place-content-start gap-x-4">
                      <h4>Width</h4>
                      <p>{video.youtube.channel.thumbnail.width} px</p>
                      <h4>Height</h4>
                      <p>{video.youtube.channel.thumbnail.height} px</p>
                      <a
                        className="col-span-2  mt-2"
                        href={video.youtube.channel.thumbnail.url}
                      >
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                  <div className="grid gap-2 content-start grid-cols-[auto_1fr] place-content-start gap-x-6">
                    <h4>Videos</h4>
                    <p>{prettyNumber(video.youtube.channel.videoCount)}</p>
                    <h4>Views</h4>
                    <p>{prettyNumber(video.youtube.channel.viewCount)}</p>
                    <h4>Created at</h4>
                    <p>{prettyDate(video.youtube.channel.publishedAt)}</p>
                    {video.youtube.channel.customURL ? (
                      <>
                        <h4>Custom URL</h4>
                        <a
                          href={`https://youtube.com/c/${video.youtube.channel.customURL}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <p>
                            https://youtube.com/c/
                            {video.youtube.channel.customURL}
                          </p>
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                    <p className="col-span-2">
                      {video.youtube.channel.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light-00dp dark:bg-dark-03dp shadow-lg grid gap-y-4 place-content-start  p-6 rounded-xl w-[25rem]">
              <h3 className="uppercase text-accent dark:text-accent text-center font-bold mb-2">
                Latest Videos
              </h3>
              {error2 ? (
                <div>failed to load</div>
              ) : !videoPreviews ? (
                ""
              ) : (
                <>
                  {videoPreviews.map((video) => (
                    <div key={video.id} className="cursor-pointer">
                      <Link href={video.watchUrl} passHref>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="grid relative">
                            {video.thumbnail ? (
                              <img
                                className="rounded-md"
                                src={video.thumbnail.url}
                                alt={video.title}
                              />
                            ) : (
                              <VideoError/>
                            )}
                            {video.duration ? (
                              <p className="absolute bottom-1 right-1 bg-light-00dp dark:bg-dark-00dp px-2 rounded-full text-xs text-light-emphasis dark:text-dark-emphasis">
                                {prettyDuration(video.duration)}
                              </p>
                            ) : (
                              ""
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
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

/* eslint-disable @next/next/no-img-element */
import VideoError from "components/VideoError";
import { APIVideoPreview } from "helpers/api";
import { fetcher, prettyDuration } from "helpers/tools";
import Link from "next/link";
import useSWR from "swr";

export default function Home(): JSX.Element {
  const url = `/api/videos/`;
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;

  const videoPreviews: APIVideoPreview[] = data;

  if (videoPreviews) {
    return (
      <div className="px-4 py-2 grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-4">
        {videoPreviews.map((video) => (
          <div key={video.id} className="cursor-pointer">
            <Link href={video.watchUrl} passHref>
              <div className="grid gap-4">
                <div className="grid relative rounded-md overflow-hidden aspect-video content-center">
                  {video.thumbnail ? (
                    <>
                      <img
                        className="shadow-inner"
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

                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <img
                    className="rounded-full w-10 shadow-lg"
                    src={video.channel.thumbnail.url}
                    alt=""
                  />
                  <div>
                    <p className="text-light-emphasis dark:text-dark-emphasis font-bold max-line">
                      {video.title.length > 30
                        ? video.title.substring(0, 27) + "..."
                        : video.title}
                    </p>
                    <p className="text-sm">{video.channel.title}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

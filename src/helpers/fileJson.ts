import prisma from "helpers/prisma";
import { readFile } from "fs";

export type RawJson = {
  width: number;
  height: number;
  duration: number;
  subtitles: [key: string] | null;
  filesize_approx: number;
  fps: number;
  dynamic_range: string;
  vcodec: string;
  acodec: string;
};

export type MetaJson = {
  width: number | null;
  height: number | null;
  duration: number | null;
  subtitles: string;
  filesize: number | null;
  fps: number | null;
  isHDR: boolean | null;
  vcodec: string | null;
  acodec: string | null;
};

export function fetchFileJson(videoID: string): MetaJson {
  const fileJson: MetaJson = {
    width: null,
    height: null,
    duration: null,
    subtitles: "",
    filesize: null,
    fps: null,
    isHDR: null,
    vcodec: null,
    acodec: null,
  };
  return fileJson;
}

export function rawJsonToMetaJson(rawJson: RawJson): MetaJson {
  // Remove the live_chat from the list of subtitles
  const subtitles = rawJson.subtitles ? Object.keys(rawJson.subtitles) : [];
  if (subtitles.indexOf("live_chat") >= 0)
    subtitles.splice(subtitles.indexOf("live_chat"), 1);
  return {
    width: rawJson.width,
    height: rawJson.height,
    duration: rawJson.duration,
    subtitles: subtitles.join("/"),
    filesize: rawJson.filesize_approx,
    fps: rawJson.width,
    isHDR: rawJson.dynamic_range !== "SDR",
    vcodec: rawJson.vcodec,
    acodec: rawJson.acodec,
  };
}

export async function fileToUpdatePrisma(videoID: string) {
  readFile(
    `${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/${videoID}.info.json`,
    "utf8",
    async (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        const fileJson: RawJson = await JSON.parse(data);
        const metaJson: MetaJson = rawJsonToMetaJson(fileJson);

        await prisma.video.update({
          data: {
            width: metaJson.width,
            height: metaJson.height,
            duration: metaJson.duration,
            subtitles: metaJson.subtitles,
            filesize: metaJson.filesize ? Math.floor(metaJson.filesize) : null,
            fps: metaJson.fps,
            isHDR: metaJson.isHDR,
            vcodec: metaJson.vcodec,
            acodec: metaJson.acodec,
          },
          where: { id: videoID },
        });
      }
    }
  );
}

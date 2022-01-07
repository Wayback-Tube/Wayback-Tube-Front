import { existsSync, unlinkSync } from "fs";

export async function downloadVideoArchive(videoID: string) {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);

  let command: string[] = [];

  // Path to yt-dlp executable
  command.push(`'${process.env.WAYBACK_TUBE_DL_PATH}/yt-dlp'`);

  // Donwload options
  command.push("--ignore-config");
  command.push("--no-continue");
  command.push("--no-overwrites");
  command.push("--sub-langs all");

  // Input format
  command.push("--prefer-free-formats");

  // Embed data
  command.push("--embed-subs");
  command.push("--embed-chapters");
  command.push("--embed-info-json");
  command.push("--embed-metadata");

  // Save other data
  command.push("--write-subs");
  command.push("--write-thumbnail");
  command.push("--write-info-json");
  command.push("--write-annotations");

  // Output format
  command.push(`--ffmpeg-location '${process.env.WAYBACK_TUBE_DL_PATH}'`);
  command.push(
    `--output '${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/%(id)s.%(ext)s'`
  );
  command.push("--merge-output-format mp4");

  // Finally pass the video ID to download
  command.push(videoID);

  const commandCompiled = command.join(" ");

  await exec(commandCompiled);

  await convertThumbnail(videoID);
}

export async function convertThumbnail(videoId: string) {
  if (
    existsSync(
      `${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/${videoId}.jpg`
    )
  ) {
    const util = require("util");
    const exec = util.promisify(require("child_process").exec);

    let command: string[] = [];
    command.push(`${process.env.WAYBACK_TUBE_DL_PATH}/cwebp`);
    command.push("-q 80");
    command.push("-m 6");
    command.push(
      `${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/${videoId}.jpg`
    );
    command.push(
      `-o ${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/${videoId}.webp`
    );
    const commandCompiled = command.join(" ");
    await exec(commandCompiled);

    // Delete original file once done
    unlinkSync(
      `${process.env.WAYBACK_TUBE_DL_PATH}/public/videos/${videoId}.jpg`
    );
  }
}

export async function downloadChannelThumbnail(url: string, channelId: string) {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);

  let command: string[] = [];
  command.push("wget");
  command.push(url);
  command.push(
    `-O ${process.env.WAYBACK_TUBE_DL_PATH}/public/channels/${channelId}.webp`
  );
  const commandCompiled = command.join(" ");
  await exec(commandCompiled);
}

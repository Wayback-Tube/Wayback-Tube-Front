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
  // Taken from https://github.com/TheFrenchGhosty/TheFrenchGhostys-Ultimate-YouTube-DL-Scripts-Collection
  //command.push(
  //  '--format "(bestvideo[vcodec^=av01][height>=4320][fps>30]/bestvideo[vcodec^=vp9.2][height>=4320][fps>30]/bestvideo[vcodec^=vp9][height>=4320][fps>30]/bestvideo[vcodec^=avc1][height>=4320][fps>30]/bestvideo[height>=4320][fps>30]/bestvideo[vcodec^=av01][height>=4320]/bestvideo[vcodec^=vp9.2][height>=4320]/bestvideo[vcodec^=vp9][height>=4320]/bestvideo[vcodec^=avc1][height>=4320]/bestvideo[height>=4320]/bestvideo[vcodec^=av01][height>=2880][fps>30]/bestvideo[vcodec^=vp9.2][height>=2880][fps>30]/bestvideo[vcodec^=vp9][height>=2880][fps>30]/bestvideo[vcodec^=avc1][height>=2880][fps>30]/bestvideo[height>=2880][fps>30]/bestvideo[vcodec^=av01][height>=2880]/bestvideo[vcodec^=vp9.2][height>=2880]/bestvideo[vcodec^=vp9][height>=2880]/bestvideo[vcodec^=avc1][height>=2880]/bestvideo[height>=2880]/bestvideo[vcodec^=av01][height>=2160][fps>30]/bestvideo[vcodec^=vp9.2][height>=2160][fps>30]/bestvideo[vcodec^=vp9][height>=2160][fps>30]/bestvideo[vcodec^=avc1][height>=2160][fps>30]/bestvideo[height>=2160][fps>30]/bestvideo[vcodec^=av01][height>=2160]/bestvideo[vcodec^=vp9.2][height>=2160]/bestvideo[vcodec^=vp9][height>=2160]/bestvideo[vcodec^=avc1][height>=2160]/bestvideo[height>=2160]/bestvideo[vcodec^=av01][height>=1440][fps>30]/bestvideo[vcodec^=vp9.2][height>=1440][fps>30]/bestvideo[vcodec^=vp9][height>=1440][fps>30]/bestvideo[vcodec^=avc1][height>=1440][fps>30]/bestvideo[height>=1440][fps>30]/bestvideo[vcodec^=av01][height>=1440]/bestvideo[vcodec^=vp9.2][height>=1440]/bestvideo[vcodec^=vp9][height>=1440]/bestvideo[vcodec^=avc1][height>=1440]/bestvideo[height>=1440]/bestvideo[vcodec^=av01][height>=1080][fps>30]/bestvideo[vcodec^=vp9.2][height>=1080][fps>30]/bestvideo[vcodec^=vp9][height>=1080][fps>30]/bestvideo[vcodec^=avc1][height>=1080][fps>30]/bestvideo[height>=1080][fps>30]/bestvideo[vcodec^=av01][height>=1080]/bestvideo[vcodec^=vp9.2][height>=1080]/bestvideo[vcodec^=vp9][height>=1080]/bestvideo[vcodec^=avc1][height>=1080]/bestvideo[height>=1080]/bestvideo[vcodec^=av01][height>=720][fps>30]/bestvideo[vcodec^=vp9.2][height>=720][fps>30]/bestvideo[vcodec^=vp9][height>=720][fps>30]/bestvideo[vcodec^=avc1][height>=720][fps>30]/bestvideo[height>=720][fps>30]/bestvideo[vcodec^=av01][height>=720]/bestvideo[vcodec^=vp9.2][height>=720]/bestvideo[vcodec^=vp9][height>=720]/bestvideo[vcodec^=avc1][height>=720]/bestvideo[height>=720]/bestvideo[vcodec^=av01][height>=480][fps>30]/bestvideo[vcodec^=vp9.2][height>=480][fps>30]/bestvideo[vcodec^=vp9][height>=480][fps>30]/bestvideo[vcodec^=avc1][height>=480][fps>30]/bestvideo[height>=480][fps>30]/bestvideo[vcodec^=av01][height>=480]/bestvideo[vcodec^=vp9.2][height>=480]/bestvideo[vcodec^=vp9][height>=480]/bestvideo[vcodec^=avc1][height>=480]/bestvideo[height>=480]/bestvideo[vcodec^=av01][height>=360][fps>30]/bestvideo[vcodec^=vp9.2][height>=360][fps>30]/bestvideo[vcodec^=vp9][height>=360][fps>30]/bestvideo[vcodec^=avc1][height>=360][fps>30]/bestvideo[height>=360][fps>30]/bestvideo[vcodec^=av01][height>=360]/bestvideo[vcodec^=vp9.2][height>=360]/bestvideo[vcodec^=vp9][height>=360]/bestvideo[vcodec^=avc1][height>=360]/bestvideo[height>=360]/bestvideo[vcodec^=avc1][height>=240][fps>30]/bestvideo[vcodec^=av01][height>=240][fps>30]/bestvideo[vcodec^=vp9.2][height>=240][fps>30]/bestvideo[vcodec^=vp9][height>=240][fps>30]/bestvideo[height>=240][fps>30]/bestvideo[vcodec^=avc1][height>=240]/bestvideo[vcodec^=av01][height>=240]/bestvideo[vcodec^=vp9.2][height>=240]/bestvideo[vcodec^=vp9][height>=240]/bestvideo[height>=240]/bestvideo[vcodec^=avc1][height>=144][fps>30]/bestvideo[vcodec^=av01][height>=144][fps>30]/bestvideo[vcodec^=vp9.2][height>=144][fps>30]/bestvideo[vcodec^=vp9][height>=144][fps>30]/bestvideo[height>=144][fps>30]/bestvideo[vcodec^=avc1][height>=144]/bestvideo[vcodec^=av01][height>=144]/bestvideo[vcodec^=vp9.2][height>=144]/bestvideo[vcodec^=vp9][height>=144]/bestvideo[height>=144]/bestvideo)+(bestaudio[acodec^=opus]/bestaudio)/best"'
  //);

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
  const fs = require("fs");
  if (
    fs.existsSync(
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
    fs.unlinkSync(
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

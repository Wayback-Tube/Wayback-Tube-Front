// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  PrismaToAPIVideo,
  APIVideo,
  YouTubeToPrismaChannel,
  YouTubeToPrismaVideo,
  APIYtdlMeta,
} from "helpers/api";
import { YouTubeDataChannel, YouTubeDataVideo } from "helpers/youtubeApi";
import { FileJson } from "helpers/fileJson";

export type APIVideoPost = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIVideo | APIVideoPost | null>
) {
  const { videoID } = req.query;
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const video = await prisma.video.findUnique({
      where: { id: `${videoID}` },
    });
    if (video) {
      const channel = await prisma.channel.findUnique({
        where: { id: `${video.channelId}` },
      });

      if (channel) {
        res.status(200).json(PrismaToAPIVideo(video, channel));
      }
    } else {
      res.status(404).json(null);
    }
  } else if (req.method === "POST") {
    const fetchYouTubeVideoResponse = await fetchYouTubeVideo(`${videoID}`);

    if (fetchYouTubeVideoResponse.items.length === 1) {
      const youtubeVideo = fetchYouTubeVideoResponse.items[0];
      const fetchYouTubeChannelResponse = await fetchYouTubeChannel(
        youtubeVideo.snippet.channelId
      );
      if (fetchYouTubeChannelResponse.items.length === 1) {
        const youtubeChannel = fetchYouTubeChannelResponse.items[0];
        const channel = YouTubeToPrismaChannel(youtubeChannel);

        // Create the new channel in Prisma
        const prismaChannel = await prisma.channel.upsert({
          create: channel,
          update: channel,
          where: { id: channel.id },
        });

        const defaultFileJson: FileJson = {
          width: 0,
          height: 0,
          duration: 0,
          subtitles: "",
          filesize: 0,
          fps: 0,
          isHDR: false,
          vcodec: "",
          acodec: "",
        };

        const archiverID = "";

        // Create the new channel in Prisma
        const video = YouTubeToPrismaVideo(
          youtubeVideo,
          channel.id,
          defaultFileJson,
          archiverID
        );
        
        const prismaVideo = await prisma.video.upsert({
          create: video,
          update: video,
          where: { id: video.id },
        });
      }
    }

    res.status(200).json(null);
  } else {
    res.status(404).json(null);
  }
}

async function fetchYouTubeVideo(id: string): Promise<YouTubeDataVideo> {
  const part =
    "contentDetails,id,liveStreamingDetails,snippet,statistics,status";
  const key = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${id}&key=${key}`;
  const res = await fetch(url);
  return await res.json();
}

async function fetchYouTubeChannel(id: string): Promise<YouTubeDataChannel> {
  const part = "id,snippet,statistics";
  const key = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`;
  const res = await fetch(url);
  return await res.json();
}

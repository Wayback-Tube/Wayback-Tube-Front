// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaToAPIVideo, APIVideo, APIMessageResponse } from "helpers/api";
import prisma from "helpers/prisma";
import {
  YouTubeToPrismaChannel,
  YouTubeToPrismaVideo,
} from "helpers/youtubeApi";
import { fetchFileJson, fileToUpdatePrisma } from "helpers/fileJson";
import { downloadChannelThumbnail, downloadVideoArchive } from "helpers/ytdlp";
import { fetchYouTubeVideo, fetchYouTubeChannel } from "helpers/youtubeApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIVideo | APIMessageResponse >
) {
  const { videoID } = req.query;

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
      res.status(404).json({message: "Not Found: The video has not yet being archived. To archive it, rerun this query with the method POST."});
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

        if (prismaChannel.id === channel.id) {
          const defaultFileJson = fetchFileJson(youtubeVideo.id);

          // Create the new channel in Prisma
          const video = YouTubeToPrismaVideo(
            youtubeVideo,
            channel,
            defaultFileJson
          );

          downloadChannelThumbnail(
            youtubeChannel.snippet.thumbnails.high.url,
            channel.id
          );

          const prismaVideo = await prisma.video.upsert({
            create: video,
            update: video,
            where: { id: video.id },
          });

          if (prismaVideo.id === video.id) {
            res.status(200).json({message: "Success!"});
            downloadVideoArchive(video.id).then(() => {
              fileToUpdatePrisma(video.id);
            });
          } else {
            res.status(500).json({message: "Internal error: the video entry couldn't be created in the database."});
          }
        } else {
          res.status(500).json({message: "Internal error: the channel entry couldn't be created in the database."});
        }
      } else {
        res.status(410).json({message: "Gone: The video exists, but YouTube can't find the channel... What?"});
      }
    } else {
      res.status(410).json({message: "Gone: The target resource is no longer available at the origin. The video is either private, has been deleted, or the ID is unvalid."
      });
    }
  } else {
    res.status(405).json({message: "Method Not Allowed: The method received in the request-line is known by the origin server but not supported by the target resource."});
  }
}

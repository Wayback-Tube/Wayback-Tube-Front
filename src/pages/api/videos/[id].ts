// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type VideoResponse = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  channelId: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  tags: string[];
  defaultLanguage: string;
  category: string;
  duration: number;
  is3D: boolean;
  is360: boolean;
  isUnlisted: boolean;
  isCC: boolean;
  isForKids: boolean;
  subtitles: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  liveActualStartTime: string;
  liveActualEndTime: string;
  liveScheduledStartTime: string;
  liveScheduledEndTime: string;
  width: number;
  height: number;
  ext: string;
  filesize: number;
  fps: number;
  isHDR: boolean;
  vcodec: string;
  acodec: string;
  archivedAt: string;
  archivedBy: string;
  lastUpdatedAt: string;
  collectionCount: number;
} | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VideoResponse>
) {
  const { id } = req.query;

  const prisma = new PrismaClient();
  const result = await prisma.video.findUnique({ where: { id: `${id}` } });

  if (result) {
    const response: Response = {
      id: result.id,
      title: result.title,
      description: result.description,
      publishedAt: result.publishedAt,
      channelId: result.channelId,
      videoUrl:
        process.env.NEXT_PUBLIC_ARCHIVES_URL +
        result.id +
        "/file." +
        result.ext,
      metadataUrl:
        process.env.NEXT_PUBLIC_ARCHIVES_URL + result.id + "/file.json",
      thumbnailUrl:
        process.env.NEXT_PUBLIC_ARCHIVES_URL + result.id + "/file.webp",
      thumbnailWidth: 1280,
      thumbnailHeight: 720,
      tags: result.tags ? result.tags : [],
      defaultLanguage: result.defaultLanguage,
      category: result.category,
      duration: result.duration,
      is3D: result.is3D,
      is360: result.is360,
      isUnlisted: result.isUnlisted,
      isCC: result.isCC,
      isForKids: result.isForKids,
      subtitles: [],
      viewCount: result.viewCount,
      likeCount: result.likeCount,
      commentCount: result.commentCount,
      liveActualStartTime: result.liveActualStartTime
        .toISOString()
        .startsWith("1970", 0)
        ? null
        : result.liveActualStartTime,
      liveActualEndTime: result.liveActualEndTime
        .toISOString()
        .startsWith("1970", 0)
        ? null
        : result.liveActualEndTime,
      liveScheduledStartTime: result.liveScheduledStartTime
        .toISOString()
        .startsWith("1970", 0)
        ? null
        : result.liveScheduledStartTime,
      liveScheduledEndTime: result.liveScheduledEndTime
        .toISOString()
        .startsWith("1970", 0)
        ? null
        : result.liveScheduledEndTime,
      width: result.width,
      height: result.height,
      ext: result.ext,
      filesize: result.filesize,
      fps: result.fps,
      isHDR: result.isHDR,
      vcodec: result.vcodec,
      acodec: result.acodec,
      archivedAt: result.archivedAt,
      archivedBy: result.archivedBy,
      lastUpdatedAt: result.lastUpdatedAt,
      collectionCount: result.collectionCount,
    };
    res.status(200).json(response);
  } else {
    res.status(404).json(null);
  }
}

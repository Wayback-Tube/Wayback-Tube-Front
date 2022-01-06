import { Channel, Video } from "@prisma/client";

export type APICollection = {
  collectionID: string;
  name: string;
  userId: string;
  videos: string[];
};

export type APIThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type APIYouTubeChannel = {
  channelID: string;
  title: string;
  description: string;
  publishedAt: Date;
  customURL: string | null;
  thumbnail: APIThumbnail;
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
};

export type APIYouTubeVideo = {
  videoID: string;
  title: string;
  description: string;
  publishedAt: Date;
  channel: APIYouTubeChannel;
  tags: string[];
  category: string;
  is3D: boolean;
  is360: boolean;
  isUnlisted: boolean;
  isCC: boolean;
  isForKids: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  liveActualStartTime: Date | null;
  liveActualEndTime: Date | null;
  liveScheduledStartTime: Date | null;
  liveScheduledEndTime: Date | null;
};

export type APIYtdlMeta = {
  videoUrl: string | null;
  thumbnail: APIThumbnail | null;
  metadataUrl: string | null;
  livechatUrl: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  subtitles: string[] | null;
  filesize: number | null;
  fps: number | null;
  isHDR: boolean | null;
  vcodec: string | null;
  acodec: string | null;
};

export type APIWaybackMeta = {
  lastUpdatedAt: Date;
  collectionCount: number;
};

export type APIVideo = {
  youtube: APIYouTubeVideo;
  file: APIYtdlMeta;
  wayback: APIWaybackMeta;
};

export function PrismaToAPIVideo(video: Video, channel: Channel): APIVideo {
  return {
    youtube: {
      videoID: video.id,
      title: video.title,
      description: video.description,
      publishedAt: video.publishedAt,
      channel: {
        channelID: channel.id,
        title: channel.title,
        description: channel.description,
        publishedAt: channel.publishedAt,
        customURL: channel.customUrl,
        thumbnail: {
          url: `${process.env.NEXT_PUBLIC_STATIC_URL}/channels/${channel.id}.webp`,
          width: 800,
          height: 800,
        },
        viewCount: channel.viewCount,
        subscriberCount: channel.subscriberCount,
        videoCount: channel.videoCount,
      },
      tags: [],
      category: video.category,
      is3D: video.is3D,
      is360: video.is360,
      isUnlisted: video.isUnlisted,
      isCC: video.isCC,
      isForKids: video.isForKids,
      viewCount: video.viewCount,
      likeCount: video.likeCount,
      commentCount: video.commentCount,
      liveActualStartTime: video.liveActualStartTime,
      liveActualEndTime: video.liveActualEndTime,
      liveScheduledStartTime: video.liveScheduledStartTime,
      liveScheduledEndTime: video.liveScheduledEndTime,
    },
    file: {
      videoUrl: video.width
        ? `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.mp4`
        : null,
      thumbnail: video.width
        ? {
            url: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.webp`,
            width: 1280,
            height: 720,
          }
        : null,
      metadataUrl: video.width
        ? `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.info.json`
        : null,
      livechatUrl: video.width
        ? `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.live.json`
        : null,
      width: video.width,
      height: video.height,
      duration: video.duration,
      subtitles: [],
      filesize: video.filesize,
      fps: video.fps,
      isHDR: video.isHDR,
      vcodec: video.vcodec,
      acodec: video.acodec,
    },
    wayback: {
      lastUpdatedAt: video.lastUpdatedAt,
      collectionCount: 0,
    },
  };
}

import { Channel, Video, Collection} from "@prisma/client";
import { getLanguage } from "helpers/tools";
import Collections from "pages/collections";

export type APIMessageResponse = {
  message: string;
};

export type APIVideoPreview = {
  id: string;
  title: string;
  watchUrl: string;
  channel: {
    title: string,
    thumbnail: APIThumbnail
  }
  duration: number | null;
  thumbnail: APIThumbnail | null;
};

export type APICollection = {
  collectionID: string;
  name: string;
  userId: string;
  videos: APIVideosOnCollections[];
};

export type APIVideosOnCollections = {
  video: APIYouTubeVideo;
  videoID: string;
  collection: APICollection;
  collectionID: string;
}

export type APIThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type APIYouTubeChannel = {
  channelID: string;
  title: string;
  description: string;
  publishedAt: string;
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
  publishedAt: string;
  channel: APIYouTubeChannel;
  tags: string[];
  category: string;
  is3D: boolean;
  is360: boolean;
  isUnlisted: boolean;
  isCC: boolean;
  isForKids: boolean;
  viewCount: number | null;
  likeCount: number | null;
  commentCount: number | null;
  liveActualStartTime: string | null;
  liveActualEndTime: string | null;
  liveScheduledStartTime: string | null;
  liveScheduledEndTime: string | null;
};

export type APIYtdlMeta = {
  videoUrl: string | null;
  thumbnail: APIThumbnail | null;
  metadataUrl: string | null;
  livechatUrl: string | null;
  subtitles: Subtitle[];
  width: number | null;
  height: number | null;
  duration: number | null;
  filesize: number | null;
  fps: number | null;
  isHDR: boolean | null;
  vcodec: string | null;
  acodec: string | null;
};

export type Subtitle = {
  languageCode: string;
  language: string;
  url: string;
};

export type APIWaybackMeta = {
  lastUpdatedAt: string;
  collectionCount: number;
};

export type APIVideo = {
  id: string;
  watchUrl: string;
  youtube: APIYouTubeVideo;
  file: APIYtdlMeta;
  wayback: APIWaybackMeta;
};

export function PrismaToAPIVideo(video: Video, channel: Channel): APIVideo {
  const subtitles: Subtitle[] = [];
  if (video.subtitles) {
    video.subtitles.split("/").map((languageCode) => {
      subtitles.push({
        languageCode: languageCode,
        language: getLanguage(languageCode),
        url: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.${languageCode}.vtt`,
      });
    });
  }
  return {
    id: video.id,
    watchUrl: `${process.env.NEXTAUTH_URL}/watch/${video.id}`,
    youtube: {
      videoID: video.id,
      title: video.title,
      description: video.description,
      publishedAt: video.publishedAt.toISOString(),
      channel: {
        channelID: channel.id,
        title: channel.title,
        description: channel.description,
        publishedAt: channel.publishedAt.toISOString(),
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
      liveActualStartTime: video.liveActualStartTime
        ? video.liveActualStartTime.toISOString()
        : null,
      liveActualEndTime: video.liveActualEndTime
        ? video.liveActualEndTime.toISOString()
        : null,
      liveScheduledStartTime: video.liveScheduledStartTime
        ? video.liveScheduledStartTime.toISOString()
        : null,
      liveScheduledEndTime: video.liveScheduledEndTime
        ? video.liveScheduledEndTime.toISOString()
        : null,
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
      subtitles: subtitles,
      width: video.width,
      height: video.height,
      duration: video.duration,
      filesize: video.filesize,
      fps: video.fps,
      isHDR: video.isHDR,
      vcodec: video.vcodec,
      acodec: video.acodec,
    },
    wayback: {
      lastUpdatedAt: video.lastUpdatedAt.toISOString(),
      collectionCount: 0,
    },
  };
}

export function PrismaToAPICollection(collection: Collection): APICollection {
  return {
    collectionID: collection.id,
    name: collection.name,
    userId: collection.userId,
    videos: collection.videos,
  };
}

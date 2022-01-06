import { Channel, Video } from "@prisma/client";
import { FileJson } from "./fileJson";
import { YouTubeDataChannel, YouTubeDataVideo } from "./youtubeApi";

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
  customURL: string;
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
  defaultLanguage: string;
  category: string;
  is3D: boolean;
  is360: boolean;
  isUnlisted: boolean;
  isCC: boolean;
  isForKids: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  liveActualStartTime: Date;
  liveActualEndTime: Date;
  liveScheduledStartTime: Date;
  liveScheduledEndTime: Date;
};

export type APIYtdlMeta = {
  videoUrl: string;
  thumbnail: APIThumbnail;
  metadataUrl: string;
  width: number;
  height: number;
  duration: number;
  subtitles: string[];
  filesize: number;
  fps: number;
  isHDR: boolean;
  vcodec: string;
  acodec: string;
};

export type APIWaybackMeta = {
  archivedAt: Date;
  archivedBy: string;
  lastUpdatedAt: Date;
  collectionCount: number;
};

export type APIVideo = {
  youtube: APIYouTubeVideo;
  file: APIYtdlMeta;
  wayback: APIWaybackMeta;
};

export function YouTubeToPrismaChannel(
  channel: YouTubeDataChannel["items"][number]
): Channel {
  return {
    id: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description,
    publishedAt: new Date(channel.snippet.publishedAt),
    customUrl: channel.snippet.customUrl,
    viewCount: channel.statistics.viewCount,
    subscriberCount: channel.statistics.subscriberCount,
    videoCount: channel.statistics.videoCount,
  };
}

export function YouTubeToPrismaVideo(
  video: YouTubeDataVideo["items"][number],
  channelId: string,
  file: FileJson,
  archiverID: string
): Video {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    publishedAt: new Date(video.snippet.publishedAt),
    channelId: channelId,
    defaultLanguage: video.snippet.defaultLanguage,
    category: YouTubeCategoryToString(video.snippet.categoryId),
    is3D: video.contentDetails.dimension === "3d",
    is360: video.contentDetails.projection === "360",
    isUnlisted: video.status.privacyStatus === "unlisted",
    isCC: video.status.license === "creativeCommon",
    isForKids: video.status.madeForKids,
    viewCount: video.statistics.viewCount,
    likeCount: video.statistics.likeCount,
    commentCount: video.statistics.commentCount,
    liveActualStartTime: new Date(),
    liveActualEndTime: new Date(),
    liveScheduledStartTime: new Date(),
    liveScheduledEndTime: new Date(),
    duration: file.duration,
    width: file.width,
    height: file.height,
    filesize: file.filesize,
    fps: file.fps,
    isHDR: file.isHDR,
    vcodec: file.vcodec,
    acodec: file.acodec,
    archivedBy: archiverID,
    archivedAt: new Date(),
    lastUpdatedAt: new Date(),
  };
}




export function YouTubeCategoryToString(categoryid: number): string {
  return [
    "Film&Animation",
    "Autos&Vehicles",
    "Music",
    "Pets&Animals",
    "Sports",
    "ShortMovies",
    "Travel&Events",
    "Gaming",
    "Videoblogging",
    "People&Blogs",
    "Comedy",
    "Entertainment",
    "News&Politics",
    "Howto&Style",
    "Education",
    "Science&Technology",
    "Nonprofits&Activism",
    "Movies",
    "Anime/Animation",
    "Action/Adventure",
    "Classics",
    "Comedy",
    "Documentary",
    "Drama",
    "Family",
    "Foreign",
    "Horror",
    "Sci-Fi/Fantasy",
    "Thriller",
    "Shorts",
    "Shows",
    "Trailers",
  ][categoryid];
}

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
          url: `${process.env.NEXT_PUBLIC_STATIC_URL}/channel/${channel.id}.webp`,
          width: 800,
          height: 800,
        },
        viewCount: channel.viewCount,
        subscriberCount: channel.subscriberCount,
        videoCount: channel.videoCount,
      },
      tags: [],
      defaultLanguage: video.defaultLanguage,
      category: video.defaultLanguage,
      is3D: video.is3D,
      is360: video.is360,
      isUnlisted: video.isUnlisted,
      isCC: video.isCC,
      isForKids: video.isForKids,
      viewCount: video.viewCount,
      likeCount: video.likeCount,
      commentCount: video.commentCount,
      liveActualStartTime: video.liveActualStartTime,
      liveActualEndTime: video.liveActualStartTime,
      liveScheduledStartTime: video.liveActualStartTime,
      liveScheduledEndTime: video.liveActualStartTime,
    },
    file: {
      videoUrl: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.mp4`,
      thumbnail: {
        url: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.webp`,
        width: 1280,
        height: 720,
      },
      metadataUrl: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.info.json`,
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
      archivedAt: video.archivedAt,
      archivedBy: video.archivedBy,
      lastUpdatedAt: video.lastUpdatedAt,
      collectionCount: 0,
    },
  };
}

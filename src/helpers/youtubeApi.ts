import { Channel, Video } from "@prisma/client";
import { if2 } from "helpers/tools";
import { MetaJson } from "./fileJson";

export type YouTubeDataVideo = {
  items: [
    {
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        tags: string[];
        categoryId: number;
        defaultLanguage: string;
      };
      contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        projection: string;
      };
      status: {
        privacyStatus: string;
        license: string;
        madeForKids: boolean;
      };
      statistics: {
        viewCount: string;
        likeCount: string;
        commentCount: string;
      };
      liveStreamingDetails?: {
        actualStartTime?: string;
        actualEndTime?: string;
        scheduledStartTime?: string;
        scheduledEndTime?: string;
      };
    }
  ];
};

export type YouTubeDataChannel = {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        description: string;
        customUrl?: string;
        publishedAt: string;
        thumbnails: [high: { url: string }];
        country: string;
      };
      statistics: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
      };
    }
  ];
};

export function YouTubeToPrismaChannel(
  channel: YouTubeDataChannel["items"][number]
): Channel {
  return {
    id: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description,
    publishedAt: new Date(channel.snippet.publishedAt),
    customUrl: if2(channel.snippet.customUrl, null),
    viewCount: parseInt(channel.statistics.viewCount),
    subscriberCount: parseInt(channel.statistics.subscriberCount),
    videoCount: parseInt(channel.statistics.videoCount),
  };
}

export function YouTubeToPrismaVideo(
  video: YouTubeDataVideo["items"][number],
  channelId: string,
  file: MetaJson
): Video {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    publishedAt: new Date(video.snippet.publishedAt),
    channelId: channelId,
    category: YouTubeCategoryToString(video.snippet.categoryId),
    is3D: video.contentDetails.dimension === "3d",
    is360: video.contentDetails.projection === "360",
    isUnlisted: video.status.privacyStatus === "unlisted",
    isCC: video.status.license === "creativeCommon",
    isForKids: video.status.madeForKids,
    viewCount: parseInt(video.statistics.viewCount),
    likeCount: parseInt(video.statistics.likeCount),
    commentCount: parseInt(video.statistics.commentCount),
    liveActualStartTime: if2(video.liveStreamingDetails?.actualStartTime, null),
    liveActualEndTime: if2(video.liveStreamingDetails?.actualEndTime, null),
    liveScheduledStartTime: if2(
      video.liveStreamingDetails?.scheduledStartTime,
      null
    ),
    liveScheduledEndTime: if2(
      video.liveStreamingDetails?.scheduledEndTime,
      null
    ),
    duration: file.duration,
    width: file.width,
    height: file.height,
    filesize: file.filesize,
    fps: file.fps,
    isHDR: file.isHDR,
    vcodec: file.vcodec,
    acodec: file.acodec,
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

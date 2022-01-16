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
        viewCount?: string;
        likeCount?: string;
        commentCount?: string;
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
        thumbnails: { high: { url: string } };
        country: string;
      };
      statistics: {
        viewCount: string;
        subscriberCount?: string;
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
    subscriberCount: channel.statistics.subscriberCount
      ? parseInt(channel.statistics.subscriberCount)
      : null,
    videoCount: parseInt(channel.statistics.videoCount),
  };
}

export function YouTubeToPrismaVideo(
  video: YouTubeDataVideo["items"][number],
  channel: Channel,
  file: MetaJson
): Video {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    publishedAt: new Date(video.snippet.publishedAt),
    channelId: channel.id,
    channelTitle: channel.title,
    category: YouTubeCategoryToString(video.snippet.categoryId),
    is3D: video.contentDetails.dimension === "3d",
    is360: video.contentDetails.projection === "360",
    isUnlisted: video.status.privacyStatus === "unlisted",
    isCC: video.status.license === "creativeCommon",
    isForKids: video.status.madeForKids,
    viewCount: video.statistics.viewCount
      ? parseInt(video.statistics.viewCount)
      : null,
    likeCount: video.statistics.likeCount
      ? parseInt(video.statistics.likeCount)
      : null,
    commentCount: video.statistics.commentCount
      ? parseInt(video.statistics.commentCount)
      : null,
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
    subtitles: file.subtitles,
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
  const categories: { [key: string]: string } = {
    1: "Film & Animation",
    2: "Autos & Vehicles",
    10: "Music",
    15: "Pets & Animals",
    17: "Sports",
    18: "Short Movies",
    19: "Travel & Events",
    20: "Gaming",
    21: "Videoblogging",
    22: "People & Blogs",
    23: "Comedy",
    24: "Entertainment",
    25: "News & Politics",
    26: "Howto & Style",
    27: "Education",
    28: "Science & Technology",
    29: "Nonprofits & Activism",
    30: "Movies",
    31: "Anime/Animation",
    32: "Action/Adventure",
    33: "Classics",
    34: "Comedy",
    35: "Documentary",
    36: "Drama",
    37: "Family",
    38: "Foreign",
    39: "Horror",
    40: "Sci-Fi/Fantasy",
    41: "Thriller",
    42: "Shorts",
    43: "Shows",
    44: "Trailers",
  };
  return categories[categoryid];
}

export async function fetchYouTubeVideo(id: string): Promise<YouTubeDataVideo> {
  const part =
    "contentDetails,id,liveStreamingDetails,snippet,statistics,status";
  const key = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${id}&key=${key}`;
  const res = await fetch(url);
  return await res.json();
}

export async function fetchYouTubeChannel(
  id: string
): Promise<YouTubeDataChannel> {
  const part = "id,snippet,statistics";
  const key = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`;
  const res = await fetch(url);
  return await res.json();
}

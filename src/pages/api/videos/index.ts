// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "helpers/prisma";
import { APIMessageResponse, APIVideoPreview } from "helpers/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIVideoPreview[] | APIMessageResponse>
) {
  if (req.method === "GET") {
    const videos = await prisma.video.findMany({orderBy: {lastUpdatedAt: "desc"}});
    if (videos) {
      const response: APIVideoPreview[] = [];
      videos.map((video) => {
        response.push({
          id: video.id,
          watchUrl: `${process.env.NEXTAUTH_URL}/watch/${video.id}`,
          title: video.title,
          channel: {
            title: video.channelTitle,
            thumbnail: {
              url: `${process.env.NEXT_PUBLIC_STATIC_URL}/channels/${video.channelId}.webp`,
              width: 800,
              height: 800,
            },
          },
          duration: video.duration,
          thumbnail: video.width
            ? {
                url: `${process.env.NEXT_PUBLIC_STATIC_URL}/videos/${video.id}.webp`,
                width: 1280,
                height: 720,
              }
            : null,
        });
      });
      res.status(200).json(response);
    } else {
      res.status(500).json({
        message: "Internal error: There was a problem while retrieving videos from the database.",
      });
    }
  } else {
    res.status(405).json({
      message:
        "Method Not Allowed: The method received in the request-line is known by the origin server but not supported by the target resource.",
    });
  }
}

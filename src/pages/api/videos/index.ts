// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "helpers/prisma";

export type APIMessageResponse = {
  message: string;
};

export type APIVideosResponse = {
  videos: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIVideosResponse | APIMessageResponse>
) {
  if (req.method === "GET") {
    const videos = await prisma.video.findMany({});
    if (videos) {
      const response: APIVideosResponse = { videos: [] };
      videos.map((video) => {
        response.videos.push(video.id);
      });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message:
          "Not Found: No videos found.",
      });
    }
  } else {
    res.status(405).json({
      message:
        "Method Not Allowed: The method received in the request-line is known by the origin server but not supported by the target resource.",
    });
  }
}

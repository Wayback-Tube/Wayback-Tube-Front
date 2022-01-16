// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "helpers/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaToAPIVideo, APIVideo, PrismaToAPICollection, APICollection} from "helpers/api";
import {
  YouTubeDataChannel,
  YouTubeDataVideo,
  YouTubeToPrismaChannel,
  YouTubeToPrismaVideo,
  fetchYouTubeVideo, 
  fetchYouTubeChannel
} from "helpers/youtubeApi";
import { fetchFileJson, fileToUpdatePrisma } from "helpers/fileJson";

export type APICollectionEdit = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICollection | APICollectionEdit | null>
) {
  const { collectionID } = req.query;

  if (req.method === "GET") {
    const collection = await prisma.collection.findUnique({
      where: { id: `${collectionID}` },
    });
    if (collection) {
      res.status(200).json(PrismaToAPICollection(collection));
    }
    else {
      res.status(404).json(null);
    }
  } else if (req.method === "POST") {
    //création de collections?
  } else {
    res.status(404).json(null);
  }
}

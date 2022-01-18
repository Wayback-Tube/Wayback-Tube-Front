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
    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer "))
        req.headers.authorization = req.headers.authorization.substring(
          "Bearer ".length
        );

      const session = await prisma.session.findUnique({
        where: { sessionToken: req.headers.authorization },
      });

      if (session) {
        if (collectionID) {
            // TODO : insert videos in collection
        }
        else {
          const prismaCollection = await prisma.collection.create({
            data: {
              name: '',
              userId: session.user.id,
              user: session.user,
            }
          });
        }
      }
    }
  } else if (req.method === "DELETE") {
    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer "))
        req.headers.authorization = req.headers.authorization.substring(
          "Bearer ".length
        );

      const session = await prisma.session.findUnique({
        where: { sessionToken: req.headers.authorization },
      });

      if (session) {
        const deleteCollection = await prisma.collection.delete({
          where: { id: `${collectionID}` },
        });
      }
    }
  } else {
    res.status(404).json(null);
  }
}

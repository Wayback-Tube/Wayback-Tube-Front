import { PrismaClient } from "@prisma/client";

export type FileJson = {
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

export async function fetchFileJson(videoID: string) {
    const result: FileJson = {
        width: 0,
        height: 0,
        duration: 0,
        subtitles: [],
        filesize: 0,
        fps: 0,
        isHDR: false,
        vcodec: "",
        acodec: ""
    }
} 

export function fileToUpdatePrisma(fileJson: FileJson, videoID: string) {
  const prisma = new PrismaClient();
  prisma.video.update({
    select: { width: true, height: true, duration: true, ext:true, filesize: true},
    data: { width: fileJson.width },
    where: { id: videoID },
  });
}

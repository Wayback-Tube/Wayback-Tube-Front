/*
  Warnings:

  - You are about to drop the column `ext` on the `Video` table. All the data in the column will be lost.
  - Added the required column `subtitles` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "channelId" TEXT NOT NULL,
    "defaultLanguage" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "is3D" BOOLEAN NOT NULL,
    "is360" BOOLEAN NOT NULL,
    "isUnlisted" BOOLEAN NOT NULL,
    "isCC" BOOLEAN NOT NULL,
    "isForKids" BOOLEAN NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "liveActualStartTime" DATETIME,
    "liveActualEndTime" DATETIME,
    "liveScheduledStartTime" DATETIME,
    "liveScheduledEndTime" DATETIME,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "subtitles" TEXT NOT NULL,
    "filesize" INTEGER NOT NULL,
    "fps" INTEGER NOT NULL,
    "isHDR" BOOLEAN NOT NULL,
    "vcodec" TEXT NOT NULL,
    "acodec" TEXT NOT NULL,
    "archivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedBy" TEXT NOT NULL,
    "lastUpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("acodec", "archivedAt", "archivedBy", "category", "channelId", "commentCount", "defaultLanguage", "description", "duration", "filesize", "fps", "height", "id", "is360", "is3D", "isCC", "isForKids", "isHDR", "isUnlisted", "lastUpdatedAt", "likeCount", "liveActualEndTime", "liveActualStartTime", "liveScheduledEndTime", "liveScheduledStartTime", "publishedAt", "title", "vcodec", "viewCount", "width") SELECT "acodec", "archivedAt", "archivedBy", "category", "channelId", "commentCount", "defaultLanguage", "description", "duration", "filesize", "fps", "height", "id", "is360", "is3D", "isCC", "isForKids", "isHDR", "isUnlisted", "lastUpdatedAt", "likeCount", "liveActualEndTime", "liveActualStartTime", "liveScheduledEndTime", "liveScheduledStartTime", "publishedAt", "title", "vcodec", "viewCount", "width" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

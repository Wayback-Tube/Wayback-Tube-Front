/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `archivedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `archivedBy` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `defaultLanguage` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `subtitles` on the `Video` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Languages" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "SubtitlesOnVideos" (
    "videoId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    PRIMARY KEY ("videoId", "languageId"),
    CONSTRAINT "SubtitlesOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubtitlesOnVideos_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Tag" ("name") SELECT "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "channelId" TEXT NOT NULL,
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
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "filesize" INTEGER,
    "fps" INTEGER,
    "isHDR" BOOLEAN,
    "vcodec" TEXT,
    "acodec" TEXT,
    "lastUpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("acodec", "category", "channelId", "commentCount", "description", "duration", "filesize", "fps", "height", "id", "is360", "is3D", "isCC", "isForKids", "isHDR", "isUnlisted", "lastUpdatedAt", "likeCount", "liveActualEndTime", "liveActualStartTime", "liveScheduledEndTime", "liveScheduledStartTime", "publishedAt", "title", "vcodec", "viewCount", "width") SELECT "acodec", "category", "channelId", "commentCount", "description", "duration", "filesize", "fps", "height", "id", "is360", "is3D", "isCC", "isForKids", "isHDR", "isUnlisted", "lastUpdatedAt", "likeCount", "liveActualEndTime", "liveActualStartTime", "liveScheduledEndTime", "liveScheduledStartTime", "publishedAt", "title", "vcodec", "viewCount", "width" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE TABLE "new_TagsOnVideos" (
    "videoId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("videoId", "tagId"),
    CONSTRAINT "TagsOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnVideos_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TagsOnVideos" ("tagId", "videoId") SELECT "tagId", "videoId" FROM "TagsOnVideos";
DROP TABLE "TagsOnVideos";
ALTER TABLE "new_TagsOnVideos" RENAME TO "TagsOnVideos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Made the column `genre` on table `musics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `musics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "musics" ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "author" SET NOT NULL;

/*
  Warnings:

  - Added the required column `userId` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "userId" INTEGER NOT NULL;

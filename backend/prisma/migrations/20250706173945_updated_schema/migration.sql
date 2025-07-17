/*
  Warnings:

  - You are about to drop the column `content` on the `Todos` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Todos` table. All the data in the column will be lost.
  - Added the required column `todo` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "todo" TEXT NOT NULL;

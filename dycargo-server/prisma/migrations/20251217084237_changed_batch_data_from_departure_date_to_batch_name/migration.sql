/*
  Warnings:

  - You are about to drop the column `departureDate` on the `Batch` table. All the data in the column will be lost.
  - Added the required column `batchName` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "departureDate",
ADD COLUMN     "batchName" TEXT NOT NULL;

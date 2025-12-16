/*
  Warnings:

  - You are about to drop the column `name` on the `Batch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[batchCode]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batchCode` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('PENDING', 'READY', 'IN_TRANSIT', 'DELIVERED');

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "name",
ADD COLUMN     "batchCode" TEXT NOT NULL,
ADD COLUMN     "status" "BatchStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batchCode_key" ON "Batch"("batchCode");

/*
  Warnings:

  - You are about to drop the column `currentLat` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `currentLng` on the `Shipment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[batchName]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "airline" TEXT,
ADD COLUMN     "currentLat" DOUBLE PRECISION,
ADD COLUMN     "currentLng" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "currentLat",
DROP COLUMN "currentLng";

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batchName_key" ON "Batch"("batchName");

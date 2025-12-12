/*
  Warnings:

  - You are about to drop the column `createdById` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedArrival` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Shipment` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverEmail` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderEmail` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_createdById_fkey";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "createdById",
DROP COLUMN "destination",
DROP COLUMN "estimatedArrival",
DROP COLUMN "origin",
ADD COLUMN     "batchId" TEXT NOT NULL,
ADD COLUMN     "currentLat" DOUBLE PRECISION,
ADD COLUMN     "currentLng" DOUBLE PRECISION,
ADD COLUMN     "receiverEmail" TEXT NOT NULL,
ADD COLUMN     "senderEmail" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "trackingNumber" DROP NOT NULL,
ALTER COLUMN "currentStatus" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flightNumber" TEXT,
    "departureDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

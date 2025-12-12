/*
  Warnings:

  - The `currentStatus` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'FAILED', 'RETURNED');

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_batchId_fkey";

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_userId_fkey";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "currentStatus",
ADD COLUMN     "currentStatus" "Status" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

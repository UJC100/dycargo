/*
  Warnings:

  - You are about to drop the column `userId` on the `Shipment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_userId_fkey";

-- DropIndex
DROP INDEX "Shipment_userId_idx";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "userId";

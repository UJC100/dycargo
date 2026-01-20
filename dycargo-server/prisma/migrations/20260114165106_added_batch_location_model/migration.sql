-- CreateTable
CREATE TABLE "BatchLocation" (
    "id" TEXT NOT NULL,
    "currentLoction" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,

    CONSTRAINT "BatchLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BatchLocation" ADD CONSTRAINT "BatchLocation_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

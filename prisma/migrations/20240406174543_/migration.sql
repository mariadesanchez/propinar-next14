/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentId",
ADD COLUMN     "calificacion" TEXT,
ADD COLUMN     "collection_id" TEXT;

/*
  Warnings:

  - You are about to drop the column `calificacion` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `collection_id` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "calificacion",
DROP COLUMN "collection_id",
ADD COLUMN     "paymentId" TEXT;

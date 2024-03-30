/*
  Warnings:

  - You are about to drop the column `itemsInOrder` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "itemsInOrder",
ALTER COLUMN "total" SET DATA TYPE INTEGER;

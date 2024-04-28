/*
  Warnings:

  - You are about to drop the column `disabledComment` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "disabledComment",
ADD COLUMN     "transactionId" TEXT;

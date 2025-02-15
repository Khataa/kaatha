/*
  Warnings:

  - You are about to drop the column `intialAmount` on the `Registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "intialAmount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

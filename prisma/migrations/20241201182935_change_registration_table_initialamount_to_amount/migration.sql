/*
  Warnings:

  - Added the required column `add` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deduct` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "add" BOOLEAN NOT NULL,
ADD COLUMN     "deduct" BOOLEAN NOT NULL;

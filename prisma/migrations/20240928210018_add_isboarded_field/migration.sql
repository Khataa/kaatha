-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "isOnBoarded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "isOnBoarded" BOOLEAN NOT NULL DEFAULT false;

/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ShopCategory" AS ENUM ('WHOLESALE', 'RETAIL');

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Shop" (
    "shopId" SERIAL NOT NULL,
    "shopName" TEXT NOT NULL DEFAULT 'Store',
    "shopMerchantName" TEXT NOT NULL,
    "shopMerchantEmail" TEXT NOT NULL,
    "shopMerchantPassword" TEXT NOT NULL,
    "shopCategory" "ShopCategory" NOT NULL,
    "shopMerchantMobileNo" TEXT NOT NULL,
    "shopLocation" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("shopId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPassword" TEXT NOT NULL,
    "aadharCardNo" TEXT NOT NULL,
    "customerMobileNo" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Registration" (
    "registerdId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "intialAmount" INTEGER NOT NULL DEFAULT 0,
    "registeredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("registerdId")
);

-- CreateTable
CREATE TABLE "Payments" (
    "paymentId" SERIAL NOT NULL,
    "registeredId" INTEGER NOT NULL,
    "paymentDescription" TEXT NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "deduct" BOOLEAN NOT NULL,
    "add" BOOLEAN NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_registeredId_fkey" FOREIGN KEY ("registeredId") REFERENCES "Registration"("registerdId") ON DELETE RESTRICT ON UPDATE CASCADE;

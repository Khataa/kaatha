-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "aadharCardNo" DROP NOT NULL,
ALTER COLUMN "customerMobileNo" DROP NOT NULL,
ALTER COLUMN "customerAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "shopCategory" DROP NOT NULL,
ALTER COLUMN "shopMerchantMobileNo" DROP NOT NULL,
ALTER COLUMN "shopLocation" DROP NOT NULL;

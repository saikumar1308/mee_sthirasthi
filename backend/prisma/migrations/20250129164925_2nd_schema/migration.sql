/*
  Warnings:

  - You are about to drop the column `no_kichens` on the `Details` table. All the data in the column will be lost.
  - You are about to drop the column `locaton` on the `Property` table. All the data in the column will be lost.
  - Added the required column `no_kitchens` to the `Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Details" DROP COLUMN "no_kichens",
ADD COLUMN     "no_kitchens" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "locaton",
ADD COLUMN     "location" TEXT NOT NULL;

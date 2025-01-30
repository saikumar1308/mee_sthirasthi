/*
  Warnings:

  - You are about to drop the column `detailsId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amenities` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildup_area` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_parking` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_bedroooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_kitchens` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_toilets` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_detailsId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "detailsId",
ADD COLUMN     "amenities" TEXT NOT NULL,
ADD COLUMN     "buildup_area" INTEGER NOT NULL,
ADD COLUMN     "car_parking" BOOLEAN NOT NULL,
ADD COLUMN     "no_bedroooms" INTEGER NOT NULL,
ADD COLUMN     "no_kitchens" INTEGER NOT NULL,
ADD COLUMN     "no_toilets" INTEGER NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Details";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `previousWinner` on the `Round` table. All the data in the column will be lost.
  - The `selectedAttribute` column on the `Round` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Attributes" AS ENUM ('MAX_SPEED', 'POWER', 'TORQUE');

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "previousWinner",
DROP COLUMN "selectedAttribute",
ADD COLUMN     "selectedAttribute" "Attributes";

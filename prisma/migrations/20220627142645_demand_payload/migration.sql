/*
  Warnings:

  - Added the required column `payload` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "payload" TEXT NOT NULL;

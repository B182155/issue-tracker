/*
  Warnings:

  - You are about to drop the column `createdAt` on the `issue` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `issue` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `createdAt`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`;

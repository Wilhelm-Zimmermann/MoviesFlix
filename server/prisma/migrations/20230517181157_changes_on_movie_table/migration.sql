/*
  Warnings:

  - Added the required column `averageRate` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `averageRate` DOUBLE NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

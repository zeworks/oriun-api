/*
  Warnings:

  - Made the column `identificationNumber` on table `Clients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Clients` MODIFY `identificationNumber` VARCHAR(150) NOT NULL;

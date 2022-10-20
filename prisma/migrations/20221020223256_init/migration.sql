/*
  Warnings:

  - You are about to drop the column `fiscalNumber` on the `Companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Companies` DROP COLUMN `fiscalNumber`,
    ADD COLUMN `fiscalName` VARCHAR(250) NULL;

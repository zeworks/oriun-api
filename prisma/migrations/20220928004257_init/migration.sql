/*
  Warnings:

  - Added the required column `key` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Permissions` ADD COLUMN `key` VARCHAR(70) NOT NULL;

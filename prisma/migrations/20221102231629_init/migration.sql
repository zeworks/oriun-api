/*
  Warnings:

  - You are about to drop the `_CompaniesToContacts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CompaniesToContacts` DROP FOREIGN KEY `_CompaniesToContacts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CompaniesToContacts` DROP FOREIGN KEY `_CompaniesToContacts_B_fkey`;

-- AlterTable
ALTER TABLE `Contacts` ADD COLUMN `companyId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_CompaniesToContacts`;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

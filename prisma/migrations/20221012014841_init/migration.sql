/*
  Warnings:

  - You are about to drop the column `roleId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `roleId`,
    ADD COLUMN `rolesId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

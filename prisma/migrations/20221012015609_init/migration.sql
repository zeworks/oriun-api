/*
  Warnings:

  - You are about to drop the column `rolesId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_rolesId_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `rolesId`,
    ADD COLUMN `roleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

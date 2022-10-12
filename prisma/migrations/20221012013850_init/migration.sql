-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- AlterTable
ALTER TABLE `Users` MODIFY `roleId` VARCHAR(250) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

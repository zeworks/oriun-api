-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

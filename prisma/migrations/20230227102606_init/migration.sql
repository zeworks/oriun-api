-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_contactId_fkey`;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

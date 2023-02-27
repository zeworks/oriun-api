-- AlterTable
ALTER TABLE `Users` ADD COLUMN `contactId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

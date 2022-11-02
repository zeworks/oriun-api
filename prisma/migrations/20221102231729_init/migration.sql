-- DropForeignKey
ALTER TABLE `Contacts` DROP FOREIGN KEY `Contacts_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

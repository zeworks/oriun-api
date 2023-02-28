-- AlterTable
ALTER TABLE `Clients` ADD COLUMN `companyId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Contacts` ADD COLUMN `clientsId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_clientsId_fkey` FOREIGN KEY (`clientsId`) REFERENCES `Clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

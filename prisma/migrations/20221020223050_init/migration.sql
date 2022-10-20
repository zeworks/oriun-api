/*
  Warnings:

  - You are about to drop the `_ContactsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ContactsToUsers` DROP FOREIGN KEY `_ContactsToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ContactsToUsers` DROP FOREIGN KEY `_ContactsToUsers_B_fkey`;

-- DropTable
DROP TABLE `_ContactsToUsers`;

-- CreateTable
CREATE TABLE `Companies` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(250) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `vatNumber` VARCHAR(150) NULL,
    `identificationNumber` VARCHAR(150) NULL,
    `fiscalNumber` VARCHAR(150) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompaniesToContacts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompaniesToContacts_AB_unique`(`A`, `B`),
    INDEX `_CompaniesToContacts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompaniesToContacts` ADD CONSTRAINT `_CompaniesToContacts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompaniesToContacts` ADD CONSTRAINT `_CompaniesToContacts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

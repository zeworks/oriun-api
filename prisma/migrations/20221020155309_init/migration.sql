-- CreateTable
CREATE TABLE `Contacts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `prefix` VARCHAR(20) NOT NULL,
    `address` VARCHAR(250) NULL,
    `email` VARCHAR(150) NULL,
    `country` VARCHAR(50) NOT NULL,
    `default` BOOLEAN NOT NULL DEFAULT false,
    `postalCode` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContactsToUsers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContactsToUsers_AB_unique`(`A`, `B`),
    INDEX `_ContactsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ContactsToUsers` ADD CONSTRAINT `_ContactsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactsToUsers` ADD CONSTRAINT `_ContactsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

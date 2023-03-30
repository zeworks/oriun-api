-- CreateTable
CREATE TABLE `_ClientsToUsers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClientsToUsers_AB_unique`(`A`, `B`),
    INDEX `_ClientsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClientsToUsers` ADD CONSTRAINT `_ClientsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientsToUsers` ADD CONSTRAINT `_ClientsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

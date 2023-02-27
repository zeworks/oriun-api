-- CreateTable
CREATE TABLE `Clients` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(250) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `identificationNumber` VARCHAR(150) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `picture` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

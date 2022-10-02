/*
  Warnings:

  - You are about to drop the column `rolesId` on the `Permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Permissions` DROP FOREIGN KEY `Permissions_rolesId_fkey`;

-- AlterTable
ALTER TABLE `Permissions` DROP COLUMN `rolesId`;

-- CreateTable
CREATE TABLE `_PermissionsToRoles` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PermissionsToRoles_AB_unique`(`A`, `B`),
    INDEX `_PermissionsToRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

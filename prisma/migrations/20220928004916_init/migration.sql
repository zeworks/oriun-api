/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Permissions_key_key` ON `Permissions`(`key`);

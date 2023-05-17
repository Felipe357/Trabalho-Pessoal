/*
  Warnings:

  - You are about to drop the column `id_produto` on the `vendas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `vendas` DROP FOREIGN KEY `Vendas_id_produto_fkey`;

-- AlterTable
ALTER TABLE `vendas` DROP COLUMN `id_produto`;

-- CreateTable
CREATE TABLE `Itens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,
    `id_venda` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Itens` ADD CONSTRAINT `Itens_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itens` ADD CONSTRAINT `Itens_id_venda_fkey` FOREIGN KEY (`id_venda`) REFERENCES `Vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

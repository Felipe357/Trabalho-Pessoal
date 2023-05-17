/*
  Warnings:

  - You are about to drop the column `id_estoque` on the `vendas` table. All the data in the column will be lost.
  - You are about to drop the `estoque` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qntd` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vendas` DROP FOREIGN KEY `Vendas_id_estoque_fkey`;

-- AlterTable
ALTER TABLE `produtos` ADD COLUMN `qntd` INTEGER NOT NULL,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vendas` DROP COLUMN `id_estoque`,
    ADD COLUMN `id_cliente` INTEGER NULL,
    ALTER COLUMN `id_produto` DROP DEFAULT;

-- DropTable
DROP TABLE `estoque`;

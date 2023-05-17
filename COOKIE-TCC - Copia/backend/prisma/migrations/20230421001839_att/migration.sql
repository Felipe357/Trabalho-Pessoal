/*
  Warnings:

  - You are about to drop the column `id_cliente` on the `vendas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `endereco` MODIFY `descricao` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vendas` DROP COLUMN `id_cliente`,
    ADD COLUMN `cliente` VARCHAR(191) NULL,
    ADD COLUMN `entrega` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `marcou` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `pagamento` VARCHAR(191) NULL;

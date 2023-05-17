/*
  Warnings:

  - Made the column `marcou` on table `vendas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vendas` MODIFY `marcou` BOOLEAN NOT NULL DEFAULT false;

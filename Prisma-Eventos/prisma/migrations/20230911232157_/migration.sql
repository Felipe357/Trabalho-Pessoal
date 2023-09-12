-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `data` DATETIME(3) NOT NULL,
    `inicio` VARCHAR(191) NOT NULL,
    `duracao` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `part` INTEGER NOT NULL DEFAULT 0,
    `idade` INTEGER NULL,
    `form_inicio` DATETIME(3) NOT NULL,
    `form_fim` DATETIME(3) NOT NULL,
    `form_hora_inicio` VARCHAR(191) NOT NULL,
    `form_hora_fim` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Filial` (
    `id` VARCHAR(191) NOT NULL,
    `fazenda` VARCHAR(191) NOT NULL,
    `regiao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilialEventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_evento` INTEGER NOT NULL,
    `id_filial` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colaborador` (
    `cracha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `aut` BOOLEAN NOT NULL DEFAULT false,
    `nasc` DATETIME(3) NOT NULL,
    `id_filial` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cracha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dependente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `nasc` DATETIME(3) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `cf` BOOLEAN NOT NULL,
    `cracha_col` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Col_Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cracha_col` VARCHAR(191) NOT NULL,
    `id_evento` INTEGER NOT NULL,
    `presenca` BOOLEAN NOT NULL DEFAULT false,
    `bebe` BOOLEAN NOT NULL DEFAULT false,
    `transporte` BOOLEAN NOT NULL DEFAULT false,
    `confirmar` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dep_Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dependente` INTEGER NOT NULL,
    `id_evento` INTEGER NOT NULL,
    `presenca` BOOLEAN NOT NULL DEFAULT false,
    `bebe` BOOLEAN NOT NULL DEFAULT false,
    `confirmar` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acompanhante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cracha_col` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NULL,
    `id_evento` INTEGER NULL,
    `presenca` BOOLEAN NOT NULL DEFAULT false,
    `bebe` BOOLEAN NOT NULL DEFAULT false,
    `confirmar` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FilialEventos` ADD CONSTRAINT `FilialEventos_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilialEventos` ADD CONSTRAINT `FilialEventos_id_filial_fkey` FOREIGN KEY (`id_filial`) REFERENCES `Filial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colaborador` ADD CONSTRAINT `Colaborador_id_filial_fkey` FOREIGN KEY (`id_filial`) REFERENCES `Filial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dependente` ADD CONSTRAINT `Dependente_cracha_col_fkey` FOREIGN KEY (`cracha_col`) REFERENCES `Colaborador`(`cracha`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Col_Evento` ADD CONSTRAINT `Col_Evento_cracha_col_fkey` FOREIGN KEY (`cracha_col`) REFERENCES `Colaborador`(`cracha`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Col_Evento` ADD CONSTRAINT `Col_Evento_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dep_Evento` ADD CONSTRAINT `Dep_Evento_id_dependente_fkey` FOREIGN KEY (`id_dependente`) REFERENCES `Dependente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dep_Evento` ADD CONSTRAINT `Dep_Evento_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test202107141626563964175 implements MigrationInterface {
  name = 'Test202107141626563964175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `messages` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userReceiveId` int NOT NULL, `message` text NOT NULL, `userSendId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `fullName` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `replies` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NOT NULL, `comment` text NOT NULL, `commentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `comments` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NOT NULL, `comment` text NOT NULL, `publicationId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `images` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `base64` longtext NOT NULL, `publicationId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `publication_type` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `publications` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `stock` int NOT NULL, `price` float NOT NULL, `contact` text NOT NULL, `description` text NULL, `status` tinyint NOT NULL DEFAULT 1, `userId` int NULL, `publicationTypeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `invoice` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `rating` int NOT NULL, `publicationId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `messages` ADD CONSTRAINT `FK_633418a17a100609e1a0a579791` FOREIGN KEY (`userSendId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `replies` ADD CONSTRAINT `FK_3f3aaa45827962b1988ba2cf29f` FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` ADD CONSTRAINT `FK_93212a3c2f662e364c059410b54` FOREIGN KEY (`publicationId`) REFERENCES `publications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `images` ADD CONSTRAINT `FK_26991045c627465cf9748b3119f` FOREIGN KEY (`publicationId`) REFERENCES `publications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `publications` ADD CONSTRAINT `FK_e622491ca77016209bd7219b262` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `publications` ADD CONSTRAINT `FK_e28196d715c96ab851daa3bec20` FOREIGN KEY (`publicationTypeId`) REFERENCES `publication_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `invoice` ADD CONSTRAINT `FK_6b70b73f2cc055f85159de839b6` FOREIGN KEY (`publicationId`) REFERENCES `publications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `invoice` ADD CONSTRAINT `FK_f8e849201da83b87f78c7497dde` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `invoice` DROP FOREIGN KEY `FK_f8e849201da83b87f78c7497dde`',
    );
    await queryRunner.query(
      'ALTER TABLE `invoice` DROP FOREIGN KEY `FK_6b70b73f2cc055f85159de839b6`',
    );
    await queryRunner.query(
      'ALTER TABLE `publications` DROP FOREIGN KEY `FK_e28196d715c96ab851daa3bec20`',
    );
    await queryRunner.query(
      'ALTER TABLE `publications` DROP FOREIGN KEY `FK_e622491ca77016209bd7219b262`',
    );
    await queryRunner.query(
      'ALTER TABLE `images` DROP FOREIGN KEY `FK_26991045c627465cf9748b3119f`',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` DROP FOREIGN KEY `FK_93212a3c2f662e364c059410b54`',
    );
    await queryRunner.query(
      'ALTER TABLE `replies` DROP FOREIGN KEY `FK_3f3aaa45827962b1988ba2cf29f`',
    );
    await queryRunner.query(
      'ALTER TABLE `messages` DROP FOREIGN KEY `FK_633418a17a100609e1a0a579791`',
    );
    await queryRunner.query('DROP TABLE `invoice`');
    await queryRunner.query('DROP TABLE `publications`');
    await queryRunner.query('DROP TABLE `publication_type`');
    await queryRunner.query('DROP TABLE `images`');
    await queryRunner.query('DROP TABLE `comments`');
    await queryRunner.query('DROP TABLE `replies`');
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP TABLE `messages`');
  }
}

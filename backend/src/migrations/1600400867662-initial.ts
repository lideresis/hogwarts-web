import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1600400867662 implements MigrationInterface {
    name = 'initial1600400867662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `is_active` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `username` varchar(20) NOT NULL, `password` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `wizard` (`id` varchar(36) NOT NULL, `is_active` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `age` int NOT NULL, `specialty` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `wizard`");
        await queryRunner.query("DROP TABLE `user`");
    }

}

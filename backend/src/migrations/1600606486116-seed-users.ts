import {MigrationInterface, QueryRunner} from "typeorm";

export class seedUsers1600606486116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("INSERT INTO `user` (`id`,`is_active`,`created_at`,`updated_at`,`name`,`email`,`password`) VALUES ('251490c1-10ff-4a07-bd46-8e051d382b66',1,'2020-09-20 11:42:04.764000','2020-09-20 11:42:04.764000','Dumbledore','dumbledore@hogwarts.school','$2a$10$Tz/Nc7mtlEqN16ZjDOCuPODQt.N83Xy4PCnUofLJgLbbL5M9T4YFO');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DELETE FROM `user` WHERE (`id` = '251490c1-10ff-4a07-bd46-8e051d382b66');")
    }

}

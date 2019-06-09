import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDrop1560048198496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS drone (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_image CHAR(255), customer_name CHAR(255), customer_adress CHAR(255), battery INTEGER NOT NULL, max_speed REAL NOT NULL, average_speed REAL NOT NULL, status CHAR(50), current_fly INTEGER NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);")
            .then(() => console.log('Tabela de Drones criada!'))
            .catch(err => console.log(err.message));
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("drone", true)
            .then(() => console.log('Tabela de Drones apagada!'))
            .catch(err => console.log(err.message));
    }

}

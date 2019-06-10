import {MigrationInterface, QueryRunner} from "typeorm";

import { Drone } from './../entity/Drone';

export class CreateDrop1560048198496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS drone (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_image CHAR(255), customer_name CHAR(255), customer_adress CHAR(255), battery INTEGER NOT NULL, max_speed REAL NOT NULL, average_speed REAL NOT NULL, status CHAR(50), current_fly INTEGER NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);")
            .then(() => console.log('Tabela de Drones criada!'))
            .catch(err => console.log(err.message)
        );

        await queryRunner.manager.save(queryRunner.manager.create(Drone, {
            customer_image: "https://robohash.org/uia.jpg",
            customer_name:  "Suzann",
            customer_adress: "955 Springview Junction",
            battery!: 90,
            max_speed!:  33.8,
            average_speed!: 11.6,
            status!: "failed",
            current_fly!: 94
        })).catch(error => console.log(error));

        await queryRunner.manager.save(queryRunner.manager.create(Drone, {
            customer_image: "https://robohash.org/drone.jpg",
            customer_name:  "Drake",
            customer_adress: "955 Springview Junction",
            battery!: 54,
            max_speed!:  23.8,
            average_speed!: 14.6,
            status!: "success",
            current_fly!: 98
        })).catch(error => console.log(error));
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("drone")
            .then(() => console.log('Tabela de Drones apagada!'))
            .catch(err => console.log(err.message));
    }

}

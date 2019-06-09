import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class Drone {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    customer_image: string;

    @Column()
    customer_name: string;

    @Column()
    customer_adress: string;
    
    @Column({type: "integer"})
    @IsNotEmpty()
    battery!: number;
    
    @Column({ nullable: false, type: "float", default: 0.0 })
    @IsNotEmpty()
    max_speed!: number;
    
    @Column({ nullable: false, type: "float", default: 0.0 })
    @IsNotEmpty()
    average_speed!: number;
    
    @Column()
    @IsNotEmpty()
    status!: string;
    
    @Column({type: "integer"})
    @IsNotEmpty()
    current_fly!: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}

import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logAfter() {
        console.log(`Inserted User with id: ${this.id}, name: ${this.name}, email: ${this.email}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User with id: ${this.id}, name: ${this.name}, email: ${this.email}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed User with id: ${this.id}, name: ${this.name}, email: ${this.email}`);
    }


}
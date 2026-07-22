import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Report } from 'src/reports/reports.entity';

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

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

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
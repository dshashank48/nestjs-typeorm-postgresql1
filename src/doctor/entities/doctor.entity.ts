import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { AssignedDoctor } from './assigned-doctor.entity';
@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AssignedDoctor, (assignedDoctor) => assignedDoctor.doctor)
  assignedDoctors: AssignedDoctor[];
}

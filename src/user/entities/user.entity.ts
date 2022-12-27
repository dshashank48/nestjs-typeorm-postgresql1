import { AssignedDoctor } from 'src/doctor/entities/assigned-doctor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => AssignedDoctor, (assignedDoctor) => assignedDoctor.user)
  assignedDoctors: AssignedDoctor[];
}

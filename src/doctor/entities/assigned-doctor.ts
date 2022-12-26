import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class AssignedDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.assignedDoctors)
  doctor: Doctor;

  @ManyToOne(() => User, (user) => user.assignedDoctors)
  user: User;
}

import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class AssignedDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.assignedDoctors, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;

  @ManyToOne(() => User, (user) => user.assignedDoctors, {
    onDelete: 'CASCADE',
  })
  user: User;
}

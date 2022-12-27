import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from '../entities/doctor.entity';

export class CreateAssignedDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  doctor: number;

  @ApiProperty()
  @IsNotEmpty()
  user: number;
}

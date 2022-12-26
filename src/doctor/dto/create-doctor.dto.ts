import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateDoctorDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsNotEmpty()
  name: string;
}

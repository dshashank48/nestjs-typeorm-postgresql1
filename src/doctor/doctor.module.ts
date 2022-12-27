import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedDoctor } from './entities/assigned-doctor.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, AssignedDoctor]),
    forwardRef(() => UserModule),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { DoctorService } from './doctor.service';
import { CreateAssignedDoctorDto } from './dto/create-assigned-doctor.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.create(createDoctorDto);
  }

  @Post('assigned-doctor')
  async createAssignedDoctor(@Body() createDoctorDto: CreateAssignedDoctorDto) {
    const user = await this.userService.findOne(createDoctorDto.user);
    const doctor = await this.doctorService.findOne(createDoctorDto.doctor);

    return await this.doctorService.createAssignedDoctor(user, doctor);
  }

  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }

  @Get('assigned-doctor')
  async findAllAssignedDoctors() {
    return await this.doctorService.findAllAssignedDoctor();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAssignedDoctorDto } from './dto/create-assigned-doctor.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AssignedDoctor } from './entities/assigned-doctor.entity';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(AssignedDoctor)
    private readonly assignedDoctorRepository: Repository<AssignedDoctor>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    let doctor: Doctor = new Doctor();
    doctor.name = createDoctorDto.name;

    return await this.doctorRepository.save(doctor);
  }

  async createAssignedDoctor(user: User, doctor: Doctor) {
    let assignedDoctor: AssignedDoctor = new AssignedDoctor();
    assignedDoctor.doctor = doctor;
    assignedDoctor.user = user;

    return await this.assignedDoctorRepository.save(assignedDoctor);
  }

  async findAll() {
    return await this.doctorRepository.find({ relations: ['assignedDoctors'] });
  }

  async findAllAssignedDoctor() {
    return await this.assignedDoctorRepository.find({
      relations: ['user', 'doctor'],
    });
  }

  async findOne(id: number) {
    return await this.doctorRepository.findOne({ where: { id } });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}

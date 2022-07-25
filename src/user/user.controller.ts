import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { duplicateError, res500, successRes } from 'src/config/utilFunctions';
import TransformInterceptor from 'src/config/TransformInterceptor';

@ApiTags('User')
@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      // Check if user already exists
      const foundUser = await this.userService.findByUsername(
        createUserDto.username,
      );

      if (foundUser) {
        return duplicateError(
          `User already exists with this email : ${createUserDto.username}`,
        );
      }
      const user = await this.userService.create(createUserDto);
      return successRes({ user });
    } catch (error) {
      return res500(error);
    }
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return successRes({ users });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deletedUser = await this.userService.remove(id);
    return successRes({
      message: deletedUser.affected ? 'User deleted' : 'Failed to delete user',
    });
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get('/user')
  async getAll(): Promise<UserEntity[]> {
    // const users: UserDto = this.userService.findAll();
    return this.userService.getAllUsers();
    // @Param('id', new ParseIntPipe())
    // id: string) {
  }

  @Get('/user/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user: UserDto = this.userService.findOne(id);
    if (!user) {
      throw new HttpException(`User with provided id does not exist`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user: UserDto = this.userService.update();
  //   return `This action updates a #${id} user`;
  // }

  // @Get()
  // async findAll(@Query() query: { limit: number; login: string; }): Promise<UserEntity[]> {
  //   const { limit, login } = query;
  //   return this.userService.getSuggestedUsers({
  //     limit,
  //     login,
  //   });
  // }


  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.userService.delete(id);
  }
}

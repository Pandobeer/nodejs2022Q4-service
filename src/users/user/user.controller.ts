import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, HttpStatus, HttpCode, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { HttpException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userService.create(createUserDto);
    return new UserEntity(newUser);
  }

  // @Get('/user')
  @Get()

  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))

  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const user: UserDto = this.userService.findOne(id);

    if (!user) {
      throw new HttpException(`User with provided id does not exist`, HttpStatus.NOT_FOUND);
    }

    return new UserEntity(user);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user: UserDto = this.userService.update();
  //   return `This action updates a #${id} user`;
  // }


  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {

    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new HttpException(`User with provided id does not exist`, HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(`Old password is incorrect`, HttpStatus.FORBIDDEN);
    }


    const updateUser = await this.userService.update(id, updateUserDto);

    return new UserEntity(updateUser);
  }

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const userToDelete = this.userService.findOne(id);

    if (!userToDelete) {
      throw new HttpException(`User with provided id does not exist`, HttpStatus.NOT_FOUND);
    }

    this.userService.delete(id);
  }
}

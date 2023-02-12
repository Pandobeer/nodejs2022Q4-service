import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { HttpException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    return new UserEntity(newUser);
  }

  @Get()
  getAll(): UserEntity[] {
    return this.userService.getAllUsers().map((user) => new UserEntity(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        `Old password is incorrect`,
        HttpStatus.FORBIDDEN,
      );
    }

    const updateUser = this.userService.update(id, updateUserDto);

    return new UserEntity(updateUser);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    }

    const userToDelete = this.userService.findOne(id);

    if (!userToDelete) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.userService.delete(id);
  }
}

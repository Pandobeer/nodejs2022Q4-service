import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from './user.service';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    // }

    // const user = this.userService.findOne(id);

    // if (!user) {
    //   throw new HttpException(
    //     `User with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // return new UserEntity(user);
    // return user;
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // if (!isUUID(id)) {
    //   throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    // }

    // const user = await this.userService.findOne(id);

    // if (!user) {
    //   throw new HttpException(
    //     `User with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // if (user.password !== updateUserDto.oldPassword) {
    //   throw new HttpException(
    //     `Old password is incorrect`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    // const updateUser = this.userService.update(id, updateUserDto);
    // return new UserEntity(updateUser);
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    // }

    // const userToDelete = this.userService.findOne(id);

    // if (!userToDelete) {
    //   throw new HttpException(
    //     `User with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    this.userService.delete(id);
  }
}

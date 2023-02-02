import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
// import { User } from './../interfaces/user.interface';
import { UserService } from './user.service';
import { UserEntity } from './../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  //TODO: need to find why syntax findAll( @Query() ) has a mistake;
  async findAll(query: { limit: number; login: string; }): Promise<UserEntity[]> {
    const { limit, login } = query;
    return this.userService.getSuggestedUsers({
      limit,
      login,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: UserDto = this.userService.findOne(id);
    return user;
    // @Param('id', new ParseIntPipe())
    // id: string) {
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user: UserDto = this.userService.update();
  //   return `This action updates a #${id} user`;
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

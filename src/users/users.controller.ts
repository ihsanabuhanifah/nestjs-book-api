import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('create')
  async createUser(@Body() payload: CreateUserDto): Promise<void> {
    return this.userService.createUser(payload);
  }

  @Get()
  async getBooks(): Promise<User[]> {
    return this.userService.getUsers();
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  getUserByEmail(@Body() email: string) {
    return this.usersService.findOne(email);
  }
}

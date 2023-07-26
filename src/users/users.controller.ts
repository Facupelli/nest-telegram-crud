import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  getUserByEmail(@Body() email: string) {
    return this.usersService.findOne(email);
  }
}

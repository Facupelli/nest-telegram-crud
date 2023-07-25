import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [MessageController],
  providers: [MessageService, { provide: APP_GUARD, useClass: RolesGuard }],
  imports: [HttpModule],
  exports: [MessageService],
})
export class MessageModule {}

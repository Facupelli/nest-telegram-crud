import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [HttpModule]
})
export class MessageModule {}

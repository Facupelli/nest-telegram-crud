import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [HttpModule]
})
export class ChatModule {}

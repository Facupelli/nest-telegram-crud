import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DeleteMessagetDto, PostMessagetDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  getAllMessages() {
    return this.chatService.getAllMessages();
  }

  @Post()
  postMessage(@Body() postMessageDto: PostMessagetDto) {
    return this.chatService.postMessage(postMessageDto);
  }

  @Put()
  updateMessage() {
    return this.chatService.updateMessage;
  }

  @Delete()
  deleteMessage(@Body() deleteMessageDto: DeleteMessagetDto) {
    return this.chatService.deleteMessage(deleteMessageDto);
  }
}

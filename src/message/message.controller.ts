import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MessageService } from './message.service';
import { DeleteMessagetDto, PostMessagetDto } from './dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Post()
  postMessage(@Body() postMessageDto: PostMessagetDto) {
    return this.messageService.postMessage(postMessageDto);
  }

  @Put()
  updateMessage() {
    return this.messageService.updateMessage;
  }

  @Delete()
  deleteMessage(@Body() deleteMessageDto: DeleteMessagetDto) {
    return this.messageService.deleteMessage(deleteMessageDto);
  }
}

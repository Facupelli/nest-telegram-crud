import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { DeleteMessagetDto, PostMessagetDto } from './dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  getAllMessages(@Query('chat_id', ParseIntPipe) chat_id: number) {
    return this.messageService.getAllMessages(chat_id);
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

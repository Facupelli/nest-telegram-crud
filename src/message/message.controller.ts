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
import { DeleteMessagetDto, PostMessagetDto, UpdateMessagetDto } from './dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/decorators/role.enum';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  getAllMessages(@Query('chat_id', ParseIntPipe) chat_id: number) {
    return this.messageService.getAllMessages(chat_id);
  }

  @Post()
  @Roles(Role.Admin)
  postMessage(@Body() postMessageDto: PostMessagetDto) {
    return this.messageService.postMessage(postMessageDto);
  }

  @Put()
  @Roles(Role.Admin)
  updateMessage(@Body() updateMessageDto: UpdateMessagetDto) {
    return this.messageService.updateMessage(updateMessageDto);
  }

  @Delete()
  @Roles(Role.Admin)
  deleteMessage(@Body() deleteMessageDto: DeleteMessagetDto) {
    return this.messageService.deleteMessage(deleteMessageDto);
  }
}

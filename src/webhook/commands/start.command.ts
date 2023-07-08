import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { Update } from '../types';

@Injectable()
export class StartCommand {
  constructor(private messageService: MessageService) {}

  getName() {
    return 'start';
  }

  private async sendStartMessage(chat_id: number) {
    await this.messageService.postMessage({
      chat_id,
      text: `Hola! tu chat_id para que pruebes la API es ${chat_id}`,
    });
  }

  async handleCommand(update: Update) {
    const chat_id = update.message.chat.id;
    await this.sendStartMessage(chat_id);
  }
}

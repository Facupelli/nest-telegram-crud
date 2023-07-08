import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { Update } from '../types';

@Injectable()
export class InfoCommand {
  constructor(private messageService: MessageService) {}

  getName() {
    return '/info';
  }

  private async sendInfoMessage(chat_id: number) {
    await this.messageService.postMessage({
      chat_id,
      text: `Este proyecto es parte de un desafío desarrollado para la empresa Fidoo. Consiste en una API creada con Nest.js y Typescript que se conecta con la API de Telegram y almacena datos en una base de datos Firestore.`,
    });
  }

  async handleCommand(update: Update) {
    const chat_id = update.message.chat.id;
    await this.sendInfoMessage(chat_id);
  }
}

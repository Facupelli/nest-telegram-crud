import { CollectionReference } from '@google-cloud/firestore';
import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { MessageDocument } from 'src/message/message.document';
import { MessageService } from 'src/message/message.service';
import { Update } from './types';

@Injectable()
export class WebhookService {
  constructor(
    @Inject(MessageDocument.collectionName)
    private collection: CollectionReference<MessageDocument>,
    private messageService: MessageService,
  ) {}

  async handleIncomingEvents(update: Update) {
    if (
      update.message.entities[0]?.type === 'bot_command' &&
      update.message.text === '/start'
    ) {
      const chat_id = update.message.chat.id;
      this.messageService.postMessage({
        chat_id,
        text: `Hola! tu chat_id para que pruebes la API es ${chat_id}`,
      });
    }

    if (update.message) {
      await this.collection.add(update.message);
      return true;
    }

    throw new InternalServerErrorException('new incoming message error');
  }
}

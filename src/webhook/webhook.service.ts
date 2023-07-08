import { CollectionReference } from '@google-cloud/firestore';
import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { MessageDocument } from 'src/message/message.document';
import { MessageService } from 'src/message/message.service';
import { StartCommand } from './commands/start.command';
import { Update } from './types';

@Injectable()
export class WebhookService {
  private commands = [];

  constructor(
    @Inject(MessageDocument.collectionName)
    private collection: CollectionReference<MessageDocument>,
    private messageService: MessageService,
    private startCommand: StartCommand,
  ) {
    this.commands = [this.startCommand];
  }

  private async sendStartMessage(chat_id: number) {
    await this.messageService.postMessage({
      chat_id,
      text: `Hola! tu chat_id para que pruebes la API es ${chat_id}`,
    });
  }

  private async saveMessage(message) {
    await this.collection.add(message);
  }

  async handleIncomingEvents(update: Update) {
    if (
      update.message.entities &&
      update.message.entities[0].type === 'bot_command'
    ) {
      // const chat_id = update.message.chat.id;
      // await this.sendStartMessage(chat_id);

      const command = update.message.text;
      const matchedCommand = this.commands.find(
        (cmd) => cmd.getName() === command,
      );
      console.log(matchedCommand);
      if (matchedCommand) {
        matchedCommand.handleCommand(update);
      }
    }

    if (update.message) {
      await this.saveMessage(update.message);
      return true;
    }

    throw new InternalServerErrorException('new incoming message error');
  }
}

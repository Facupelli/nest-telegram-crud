import { CollectionReference } from '@google-cloud/firestore';
import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { MessageDocument } from 'src/message/message.document';
import { MessageService } from 'src/message/message.service';
import { InfoCommand } from './commands/info.command';
import { StartCommand } from './commands/start.command';
import { Update } from './types';

@Injectable()
export class WebhookService {
  private commands = [];

  constructor(
    @Inject(MessageDocument.collectionName)
    private collection: CollectionReference<MessageDocument>,
    private startCommand: StartCommand,
    private infoCommand: InfoCommand,
  ) {
    this.commands = [this.startCommand, this.infoCommand];
  }

  private async saveMessage(message) {
    await this.collection.add(message);
  }

  async handleIncomingEvents(update: Update) {
    if (
      update.message.entities &&
      update.message.entities[0].type === 'bot_command'
    ) {
      const command = update.message.text;
      const matchedCommand = this.commands.find(
        (cmd) => cmd.getName() === command,
      );
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

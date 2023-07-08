import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { InfoCommand } from './commands/info.command';
import { StartCommand } from './commands/start.command';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [MessageModule],
  controllers: [WebhookController],
  providers: [WebhookService, StartCommand, InfoCommand],
})
export class WebhookModule {}

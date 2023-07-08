import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, MessageService],
  imports: [HttpModule],
})
export class WebhookModule {}

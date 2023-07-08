import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [MessageModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}

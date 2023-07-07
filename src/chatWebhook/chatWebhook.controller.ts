import { Controller, Post } from '@nestjs/common';
import { ChatWebhookService } from './chatWebhook.service';

@Controller('telegram-webhook')
export class ChatWebookController {
  constructor(private ChatWebhookServie: ChatWebhookService) {}

  @Post()
  handleIncomingEvent() {
    return 'webhook';
  }
}

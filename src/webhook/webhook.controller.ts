import { Body, Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

export type Update = {
  update_id: number;
  message: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
      language_code: string;
    };
    entities?: {
      length: number;
      offset: number;
      type: string;
    }[];
    chat: {
      id: number;
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text: string;
  };
};

@Controller('webhook')
export class WebhookController {
  constructor(private WebhookServie: WebhookService) {}

  @Post()
  handleIncomingEvent(@Body() update: Update) {
    return this.WebhookServie.handleIncomingEvents(update);
  }

  @Get()
  caca() {
    return 'pis';
  }
}

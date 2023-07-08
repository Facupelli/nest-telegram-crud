import { Body, Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Update } from './types';

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

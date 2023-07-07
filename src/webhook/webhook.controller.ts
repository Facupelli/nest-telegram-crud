import { Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private WebhookServie: WebhookService) {}

  @Post()
  handleIncomingEvent(update) {
    return this.WebhookServie.handleIncomingEvents(update);
  }

  @Get()
  caca(){
    return "pis"
  }
}

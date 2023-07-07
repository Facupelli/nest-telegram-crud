import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { MessageDocument } from 'src/message/message.document';
import { Update } from './webhook.controller';

@Injectable()
export class WebhookService {

  constructor(@Inject(MessageDocument.collectionName)
  private collection: CollectionReference<MessageDocument>){}

  async handleIncomingEvents(update: Update) {
    console.log(update)

    if(update.message){
      await this.collection.add({
        name:update.message.text
      })
    }

    return true;
  }
}

import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { MessageDocument } from 'src/message/message.document';

@Injectable()
export class WebhookService {

  constructor(@Inject(MessageDocument.collectionName)
  private collection: CollectionReference<MessageDocument>){}

  async handleIncomingEvents(update) {
    const {message} = update

    await this.collection.add({
      name: message.text
    })

    return true;
  }
}

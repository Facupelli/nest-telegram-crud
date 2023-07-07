import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { TodoDocument } from 'src/chat/chat.document';

@Injectable()
export class ChatWebhookService {

  constructor(@Inject(TodoDocument.collectionName)
  private collection: CollectionReference<TodoDocument>){}

  async handleIncomingEvents(update) {
    const {message} = update

    await this.collection.add({
      name: message.text
    })

    return true;
  }
}

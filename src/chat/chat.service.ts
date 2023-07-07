import { CollectionReference } from '@google-cloud/firestore';
import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import { TodoDocument } from 'src/firestore/firestore.providers';

@Injectable()
export class ChatService {
  constructor(
    @Inject(TodoDocument.collectionName)
    private collection: CollectionReference<TodoDocument>,
  ) {}

  getAllMessages() {
    return 'get all messages';
  }

  async postMessage(dto) {
    const response = await axios.post(
      'https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/sendMessage',
      dto,
    );

    const snapshot = await this.collection.get();
    console.log(snapshot);

    return response;
  }

  updateMessage() {
    return 'update message';
  }

  async deleteMessage(dto) {
    const response = await axios.post(
      'https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/deleteMessage',
      dto,
    );
    return response;
  }
}

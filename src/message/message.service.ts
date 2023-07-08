import { CollectionReference } from '@google-cloud/firestore';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Inject,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';

import { MessageDocument } from './message.document';
import { DeleteMessagetDto, PostMessagetDto, UpdateMessagetDto } from './dto';
import { PostResponse } from './types';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageDocument.collectionName)
    private collection: CollectionReference<MessageDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getAllMessages(chat_id: number) {
    const snapshot = await this.collection
      .where('chat.id', '==', chat_id)
      .get();
    const messages = snapshot.docs.map((doc) => doc.data());

    return messages;
  }

  async postMessage(dto: PostMessagetDto) {
    const request = this.httpService
      .post(
        'https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/sendMessage',
        dto,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const response: PostResponse = await lastValueFrom(request);

    if (response.ok) {
      await this.collection.add(response.result);
      return true;
    }

    throw new InternalServerErrorException('message could not be sent');
  }

  async updateMessage(dto: UpdateMessagetDto) {
    const request = this.httpService
      .post(
        'https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/editMessageText',
        dto,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((e) => {
          throw new ForbiddenException('API not available');
        }),
      );

    const response = await lastValueFrom(request);

    console.log(response);

    return true;
  }

  async deleteMessage(dto: DeleteMessagetDto) {
    const request = this.httpService
      .post(
        'https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/deleteMessage',
        dto,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const response: { ok: boolean; result: boolean } = await lastValueFrom(
      request,
    );

    if (response.result) {
      const message = await this.collection.where(
        'message_id',
        '==',
        dto.message_id,
      );
      message.get().then((snapshot) => {
        snapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });
      });
      return true;
    }

    throw new InternalServerErrorException('message could not be deleted');
  }
}

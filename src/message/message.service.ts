import { CollectionReference } from '@google-cloud/firestore';
import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { MessageDocument } from './message.document';
import { DeleteMessagetDto, PostMessagetDto } from './dto';
import { map, catchError, lastValueFrom } from 'rxjs';
import {
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

type PostResponse = {
  ok: boolean;
  result: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    chat: {
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text: string;
  };
};

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

    return { message: 'message could not be sent' };
    throw new InternalServerErrorException('message could not be sent');
  }

  updateMessage() {
    return 'update message';
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

    console.log(response);

    return { message: 'message could not be deleted' };
    throw new InternalServerErrorException('message could not be deleted');
  }
}

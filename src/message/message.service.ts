import { CollectionReference } from '@google-cloud/firestore';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Inject,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';

import { MessageDocument } from './entities/message.document';
import { DeleteMessagetDto, PostMessagetDto, UpdateMessagetDto } from './dto';
import { PostResponse, UpdateResponse } from './types';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageDocument.collectionName)
    private collection: CollectionReference<MessageDocument>,
    private readonly httpService: HttpService,
  ) {}

  private sendTelegramRequest<T>(
    method: string,
    dto: PostMessagetDto | UpdateMessagetDto | DeleteMessagetDto | undefined,
  ): Promise<T> {
    return lastValueFrom(
      this.httpService
        .post(
          `https://api.telegram.org/bot6348267525:AAG4GXEa0E5yDdYXbNVgWwLLub9A_m1w7hY/${method}`,
          dto,
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((error) => {
            throw new ForbiddenException(`API not available ${error}`);
          }),
        ),
    );
  }

  async getAllMessages(chat_id: number) {
    try {
      const snapshot = await this.collection
        .where('chat.id', '==', chat_id)
        .get();
      const messages = snapshot.docs.map((doc) => doc.data());

      return messages;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error);
    }
  }

  async postMessage(dto: PostMessagetDto) {
    const response: PostResponse = await this.sendTelegramRequest(
      'sendMessage',
      dto,
    );

    if (response.ok) {
      await this.collection.add(response.result);
      return true;
    }

    throw new InternalServerErrorException('message could not be sent');
  }

  async updateMessage(dto: UpdateMessagetDto) {
    const response: UpdateResponse = await this.sendTelegramRequest(
      'editMessageText',
      dto,
    );

    if (response.ok) {
      const message = await this.collection.where(
        'message_id',
        '==',
        dto.message_id,
      );
      message.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ text: dto.text });
        });
      });
      return true;
    }

    throw new InternalServerErrorException('message could not be edited');
  }

  async deleteMessage(dto: DeleteMessagetDto) {
    const response: { ok: boolean; result: boolean } =
      await this.sendTelegramRequest('deleteMessage', dto);

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

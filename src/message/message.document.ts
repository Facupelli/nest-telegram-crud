import { Timestamp } from '@google-cloud/firestore';

export class MessageDocument {
  static collectionName = 'messages';

  name: string;
}
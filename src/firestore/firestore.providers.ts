import { MessageDocument } from 'src/message/entities/message.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  MessageDocument.collectionName,
];

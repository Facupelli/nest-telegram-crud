import { TodoDocument } from "src/chat/chat.document";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  TodoDocument.collectionName,
];

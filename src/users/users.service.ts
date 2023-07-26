import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import admin from 'src/main';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<UserRecord> {
    if (email) {
      try {
        const user = await admin.auth().getUser('OUhbKuuqWMRRqyob9JSRvUbq2aU2');

        return user;
      } catch (error) {
        console.log(error);
      }
    }
  }
}

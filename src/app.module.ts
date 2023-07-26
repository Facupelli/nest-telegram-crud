import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { WebhookModule } from './webhook/webhook.module';
import { FirestoreModule } from './firestore/firestore.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      }),
      inject: [ConfigService],
    }),
    MessageModule,
    WebhookModule,
    UsersModule,
    // AuthModule,
  ],
})
export class AppModule {}

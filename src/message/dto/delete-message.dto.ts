import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteMessagetDto {
  @IsNotEmpty()
  chat_id: string | number;

  @IsNumber()
  @IsNotEmpty()
  message_id: string;
}

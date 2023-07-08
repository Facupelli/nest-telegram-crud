import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMessagetDto {
  @IsNotEmpty()
  chat_id: string | number;

  @IsNumber()
  @IsNotEmpty()
  message_id: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}

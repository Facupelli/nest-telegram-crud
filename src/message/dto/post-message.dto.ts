import { IsNotEmpty, IsString } from 'class-validator';

export class PostMessagetDto {
  @IsNotEmpty()
  chat_id: string | number;

  @IsString()
  @IsNotEmpty()
  text: string;
}

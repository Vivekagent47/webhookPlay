import { IsNotEmpty } from 'class-validator';

export class CreateAttemptDto {
  @IsNotEmpty()
  event_id: string;

  @IsNotEmpty()
  request_id: string;
}

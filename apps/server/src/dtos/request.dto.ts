import { IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  headers: object;

  @IsNotEmpty()
  body: object;

  @IsNotEmpty()
  source_id: string;
}

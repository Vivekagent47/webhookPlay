import { IsNotEmpty, Matches } from 'class-validator';

export class CreateSourceDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/)
  name: string;
}

export class UpdateSourceDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/)
  name: string;
}

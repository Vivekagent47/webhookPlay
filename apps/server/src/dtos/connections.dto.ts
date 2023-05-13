import { IsNotEmpty } from 'class-validator';
// import { Type } from 'class-transformer';

export class CreateConnectionDto {
  @IsNotEmpty()
  source_id: string;

  @IsNotEmpty()
  destination_id: string;
}

export class UpdateConnectionDto {
  @IsNotEmpty()
  source_id: string;

  @IsNotEmpty()
  destination_id: string;
}

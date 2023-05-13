import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { DestinationType } from 'src/entities';

export class CreateDestinationDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/)
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsEnum(DestinationType)
  type: DestinationType;
}

export class UpdateDestinationDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/)
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsEnum(DestinationType)
  type: DestinationType;
}

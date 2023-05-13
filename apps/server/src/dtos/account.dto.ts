import { IsNotEmpty } from "class-validator";

export class CreateAccountDTO {
  @IsNotEmpty()
  name: string;
}

export class UpdateAccountDTO {
  @IsNotEmpty()
  name: string;
}

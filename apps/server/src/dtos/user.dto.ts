import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}

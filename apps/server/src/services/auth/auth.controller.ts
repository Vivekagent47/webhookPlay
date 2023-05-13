import {
  Body,
  Post,
  HttpStatus,
  Controller,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO, LoginUserDTO } from "src/dtos";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("signup")
  async signup(@Body() userData: CreateUserDTO) {
    try {
      return await this.authService.register(userData);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login(@Body() userData: LoginUserDTO) {
    try {
      return await this.authService.login(userData);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("refresh")
  async refresh(@Body() refreshToken: { refresh_token: string }) {
    try {
      return await this.authService.getAccessTokenFromRefreshToken(
        refreshToken.refresh_token,
      );
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

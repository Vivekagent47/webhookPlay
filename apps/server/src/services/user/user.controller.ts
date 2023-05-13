import {
  Get,
  Controller,
  HttpStatus,
  UseGuards,
  HttpException,
  Put,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthUser, IAuthUserDecorator, UserAuthGuard } from "src/utiles";
import { UpdateUserDTO } from "src/dtos";

@Controller("api/v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(UserAuthGuard)
  @Get("/me")
  async getProfile(@AuthUser() user: IAuthUserDecorator) {
    try {
      const userData = await this.userService.findById(user.user_id);
      if (!userData)
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);

      return userData;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(UserAuthGuard)
  @Put("/me")
  async updateProfile(
    @AuthUser() user: IAuthUserDecorator,
    @Body() newUserData: UpdateUserDTO,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(
        user.user_id,
        newUserData,
      );

      return updatedUser;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

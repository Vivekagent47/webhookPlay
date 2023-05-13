import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { AuthUser, IAuthUserDecorator, UserAuthGuard } from "src/utiles";
import { CreateAccountDTO } from "src/dtos";

@Controller("api/v1/account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async createAccount(
    @Body() accountData: CreateAccountDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      return await this.accountService.createAccount(accountData, user.user_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get("/me")
  async getMyAccounts(@AuthUser() user: IAuthUserDecorator) {
    try {
      return await this.accountService.findUserAccounts(user.user_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

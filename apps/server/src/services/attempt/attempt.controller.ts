import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Headers,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AttemptService } from "./attempt.service";
import { CreateAttemptDto } from "src/dtos";
import { UserService } from "../user";
import { UserAuthGuard } from "src/utiles";

@Controller("api/v1/attempt")
export class AttemptController {
  constructor(
    private readonly attemptService: AttemptService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(
    @Body() createAttemptData: CreateAttemptDto,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.attemptService.create(
        createAttemptData.request_id,
        createAttemptData.event_id,
        account_id,
      );
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get()
  async findAll(@Headers("Account-Id") account_id: string) {
    try {
      return await this.attemptService.findAll(account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.attemptService.findOne(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get("request/:request_id")
  async findByRequestId(
    @Param("request_id") request_id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.attemptService.findByRequestId(request_id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get("event/:event_id")
  async findByEventId(
    @Param("event_id") event_id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.attemptService.findByEventId(event_id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

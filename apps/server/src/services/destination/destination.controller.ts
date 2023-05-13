import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
} from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { CreateDestinationDto, UpdateDestinationDto } from "src/dtos";
import { UserAuthGuard } from "src/utiles";
import { UserService } from "../user";

@Controller("api/v1/destination")
export class DestinationController {
  constructor(
    private readonly destinationService: DestinationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(
    @Body() createDestinationDto: CreateDestinationDto,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.destinationService.create(
        createDestinationDto,
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
      return await this.destinationService.findAll(account_id);
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
      return await this.destinationService.findOne(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.destinationService.update(
        id,
        updateDestinationDto,
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
  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.destinationService.remove(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

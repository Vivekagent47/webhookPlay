import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
} from "@nestjs/common";
import { SourceService } from "./source.service";
import { CreateSourceDto, UpdateSourceDto } from "src/dtos";
import { UserAuthGuard } from "src/utiles";
import { UserService } from "../user";

@Controller("api/v1/source")
export class SourceController {
  constructor(
    private readonly sourceService: SourceService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(
    @Body() createSourceDto: CreateSourceDto,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.sourceService.create(createSourceDto, account_id);
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
      return await this.sourceService.findAll(account_id);
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
      return await this.sourceService.findOne(id, account_id);
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
    @Body() updateSourceDto: UpdateSourceDto,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.sourceService.update(id, updateSourceDto, account_id);
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
      return await this.sourceService.remove(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

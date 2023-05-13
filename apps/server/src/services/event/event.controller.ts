import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Headers,
  Param,
  UseGuards,
  Res,
  Query,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { UserService } from "../user";
import { UserAuthGuard } from "src/utiles";

@Controller("api/v1/event")
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Get()
  async findAll(
    @Headers("Account-Id") account_id: string,
    @Query("page") page: number,
    @Res() res: any,
  ) {
    try {
      const data = await this.eventService.findAll(account_id, page);

      res.set("X-Total-Page", data.total);
      res.set("Access-Control-Expose-Headers", "X-Total-Page");
      res.send(data.data);
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
      return await this.eventService.findOne(id, account_id);
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
      return await this.eventService.findByRequestId(request_id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get("destination/:destination_id")
  async findByDestinationId(
    @Param("destination_id") destination_id: string,
    @Headers("Account-Id") account_id: string,
    @Query("page") page: number,
    @Res() res: any,
  ) {
    try {
      const data = await this.eventService.findByDestinationId(
        destination_id,
        account_id,
        page,
      );

      res.set("X-Total-Page", data.total);
      res.set("Access-Control-Expose-Headers", "X-Total-Page");
      res.send(data.data);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

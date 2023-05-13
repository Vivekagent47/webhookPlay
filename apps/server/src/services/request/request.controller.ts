import {
  Controller,
  Get,
  Param,
  UseGuards,
  Headers,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from "@nestjs/common";
import { RequestService } from "./request.service";
import { UserAuthGuard } from "src/utiles";
import { UserService } from "../user";

@Controller("api/v1/request")
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
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
      const data = await this.requestService.findAll(account_id, page);

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
      return await this.requestService.findOne(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get("source/:source_id")
  async getRequestsBySourceId(
    @Param("source_id") source_id: string,
    @Headers("Account-Id") account_id: string,
    @Query("page") page: number,

    @Res() res: any,
  ) {
    try {
      const data = await this.requestService.getRequestsBySourceId(
        source_id,
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

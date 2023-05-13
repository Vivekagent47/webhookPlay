import {
  Controller,
  Post,
  UseGuards,
  Headers,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ConnectionService } from "./connection.service";
import { UserAuthGuard } from "src/utiles";
import { CreateConnectionDto, UpdateConnectionDto } from "src/dtos";
import { UserService } from "../user";

@Controller("api/v1/connections")
export class ConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async createConnection(
    @Headers("Account-Id") account_id: string,
    @Body() connectionData: CreateConnectionDto,
  ) {
    try {
      return await this.connectionService.createConnection(
        connectionData,
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
  async findAllConnections(@Headers("Account-Id") account_id: string) {
    try {
      return await this.connectionService.getAllConnections(account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Get(":id")
  async getConnectionById(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.connectionService.getConnectionById(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Put(":id")
  async updateConnection(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
    @Body() connectionData: UpdateConnectionDto,
  ) {
    try {
      return await this.connectionService.updateConnection(
        id,
        connectionData,
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
  async deleteConnectionById(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.connectionService.removeConnectionById(id, account_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(UserAuthGuard)
  @Put(":id/status")
  async enableDisableConnection(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.connectionService.enableDisableConnection(
        id,
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
  @Get("destination/:id")
  async getConnectionByDestinationId(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.connectionService.getAllConnectionsByDestinationId(
        id,
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
  @Get("source/:id")
  async getConnectionBySourceId(
    @Param("id") id: string,
    @Headers("Account-Id") account_id: string,
  ) {
    try {
      return await this.connectionService.getAllConnectionsBySourceId(
        id,
        account_id,
      );
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

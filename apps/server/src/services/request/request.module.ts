import { Module } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "src/entities";
import { UserModule } from "../user";

@Module({
  imports: [TypeOrmModule.forFeature([Request]), UserModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}

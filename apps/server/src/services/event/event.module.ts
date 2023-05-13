import { Module, forwardRef } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Events } from "src/entities";
import { UserModule } from "../user";
import { ConnectionModule } from "../connections";
import { RequestModule } from "../request";
import { AttemptModule } from "../attempt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    UserModule,
    ConnectionModule,
    RequestModule,
    forwardRef(() => AttemptModule),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}

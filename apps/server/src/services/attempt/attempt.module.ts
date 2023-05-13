import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttemptService } from "./attempt.service";
import { AttemptController } from "./attempt.controller";
import { Attempts } from "src/entities";
import { UserModule } from "../user";
import { DestinationModule } from "../destination";
import { EventModule } from "../event";
import { RequestModule } from "../request";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attempts]),
    UserModule,
    DestinationModule,
    RequestModule,
    forwardRef(() => EventModule),
  ],
  controllers: [AttemptController],
  providers: [AttemptService],
  exports: [AttemptService],
})
export class AttemptModule {}

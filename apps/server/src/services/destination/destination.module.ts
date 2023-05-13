import { Module, forwardRef } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { DestinationController } from "./destination.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Destinations } from "src/entities";
import { UserModule } from "../user";
import { ConnectionModule } from "../connections";

@Module({
  imports: [
    TypeOrmModule.forFeature([Destinations]),
    UserModule,
    forwardRef(() => ConnectionModule),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
  exports: [DestinationService],
})
export class DestinationModule {}

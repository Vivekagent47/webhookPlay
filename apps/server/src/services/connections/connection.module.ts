import { Module, forwardRef } from "@nestjs/common";
import { ConnectionController } from "./connection.controller";
import { ConnectionService } from "./connection.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SourceDestination } from "src/entities";
import { UserModule } from "../user";
import { SourceModule } from "../source";
import { DestinationModule } from "../destination";

@Module({
  imports: [
    TypeOrmModule.forFeature([SourceDestination]),
    UserModule,
    forwardRef(() => SourceModule),
    forwardRef(() => DestinationModule),
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}

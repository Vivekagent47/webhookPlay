import { Module, forwardRef } from "@nestjs/common";
import { SourceService } from "./source.service";
import { SourceController } from "./source.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sources } from "src/entities";
import { UserModule } from "../user";
import { ConnectionModule } from "../connections";

@Module({
  imports: [
    TypeOrmModule.forFeature([Sources]),
    UserModule,
    forwardRef(() => ConnectionModule),
  ],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}

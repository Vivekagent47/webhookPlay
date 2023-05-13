import { Module, forwardRef } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { JWTModule } from "src/utiles";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountUsers, Accounts } from "src/entities";
import { UserModule } from "../user";

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, AccountUsers]),
    forwardRef(() => JWTModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user";
import { JWTModule } from "src/utiles";

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => JWTModule)],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

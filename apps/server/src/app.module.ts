import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullModule } from "@nestjs/bull";
import {
  User,
  AccountUsers,
  Accounts,
  Attempts,
  Request,
  Destinations,
  SourceDestination,
  Sources,
  Events,
} from "./entities";
import {
  AccountModule,
  AttemptModule,
  AuthModule,
  ConnectionModule,
  DestinationModule,
  EventModule,
  RequestModule,
  SourceModule,
  UserModule,
} from "./services";
import { JwtStrategy } from "./utiles";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          User,
          Events,
          Sources,
          Attempts,
          Accounts,
          AccountUsers,
          Destinations,
          Request,
          SourceDestination,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          port: +configService.get("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EventModule,
    RequestModule,
    SourceModule,
    AccountModule,
    AttemptModule,
    ConnectionModule,
    DestinationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Destinations } from "src/entities";
import { Repository } from "typeorm";
import { CreateDestinationDto, UpdateDestinationDto } from "src/dtos";
import { ConnectionService } from "../connections";
import { createId } from "src/utiles";

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destinations)
    private destinationRepo: Repository<Destinations>,

    @Inject(forwardRef(() => ConnectionService))
    private readonly connectionService: ConnectionService,
  ) {}

  async create(
    createDestinationData: CreateDestinationDto,
    account_id: string,
  ) {
    try {
      const prvDestination = await this.destinationRepo
        .createQueryBuilder()
        .where("account_id = :account_id", { account_id })
        .andWhere("name = :name", { name: createDestinationData.name })
        .getOne();

      if (prvDestination) {
        throw new HttpException(
          "Destination with this name already exists",
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.destinationRepo.save({
        id: createId("dst_"),
        account_id,
        ...createDestinationData,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(account_id: string) {
    try {
      return this.destinationRepo
        .createQueryBuilder()
        .where("account_id = :account_id", { account_id })
        .orderBy("created_at", "DESC")
        .getMany();
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string, account_id: string) {
    try {
      const destination = await this.destinationRepo
        .createQueryBuilder()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .getOne();

      if (!destination) {
        throw new HttpException("Destination not found", HttpStatus.NOT_FOUND);
      }

      return destination;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateDestinationData: UpdateDestinationDto,
    account_id: string,
  ) {
    try {
      const destination = await this.findOne(id, account_id);

      await this.destinationRepo
        .createQueryBuilder()
        .update()
        .set(updateDestinationData)
        .where("id = :id", { id: destination.id })
        .andWhere("account_id = :account_id", {
          account_id: destination.account_id,
        })
        .execute();

      return {
        message: "Destination updated successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string, account_id: string) {
    try {
      await this.connectionService.removeConnectionByDestinationId(
        id,
        account_id,
      );

      await this.destinationRepo
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Destination deleted successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

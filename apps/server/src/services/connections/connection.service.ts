import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateConnectionDto, UpdateConnectionDto } from "src/dtos";
import { DestinationService } from "../destination";
import { SourceService } from "../source";
import { Destinations, SourceDestination, Sources } from "src/entities";
import { createId } from "src/utiles";

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(SourceDestination)
    private sourceDestinationRepo: Repository<SourceDestination>,

    @Inject(forwardRef(() => DestinationService))
    private readonly destinationService: DestinationService,
    @Inject(forwardRef(() => SourceService))
    private readonly sourceService: SourceService,
  ) {}

  async checkReplationInConnectionAndAccount(
    account_id: string,
    source_id: string,
    destination_id: string,
  ) {
    try {
      const source = await this.sourceService.findOne(source_id, account_id);
      const destination = await this.destinationService.findOne(
        destination_id,
        account_id,
      );

      const prvConnection = await this.sourceDestinationRepo
        .createQueryBuilder()
        .where("source_id = :source_id AND destination_id = :destination_id", {
          source_id: source.id,
          destination_id: destination.id,
        })
        .andWhere("account_id = :account_id", { account_id })
        .getOne();

      if (prvConnection) {
        throw new HttpException(
          "Connection already exists",
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createConnection(
    connectionData: CreateConnectionDto,
    account_id: string,
  ): Promise<SourceDestination> {
    try {
      await this.checkReplationInConnectionAndAccount(
        account_id,
        connectionData.source_id,
        connectionData.destination_id,
      );

      const connection = await this.sourceDestinationRepo.save({
        id: createId("src_dst_"),
        ...connectionData,
        account_id,
      });

      return connection;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeConnectionBySourceId(source_id: string, account_id: string) {
    try {
      await this.sourceDestinationRepo
        .createQueryBuilder()
        .delete()
        .where("source_id = :source_id", { source_id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Connection removed successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeConnectionByDestinationId(
    destination_id: string,
    account_id: string,
  ) {
    try {
      await this.sourceDestinationRepo
        .createQueryBuilder()
        .delete()
        .where("destination_id = :destination_id", { destination_id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Connection removed successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeConnectionById(id: string, account_id: string) {
    try {
      await this.sourceDestinationRepo
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Connection removed successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateConnection(
    id: string,
    connectionData: UpdateConnectionDto,
    account_id: string,
  ) {
    try {
      await this.sourceDestinationRepo
        .createQueryBuilder()
        .update()
        .set(connectionData)
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Connection updated successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getConnectionById(id: string, account_id: string) {
    try {
      const connection = await this.sourceDestinationRepo
        .createQueryBuilder("connection")
        .innerJoinAndMapOne(
          "connection.source",
          Sources,
          "source",
          "source.id = connection.source_id",
        )
        .innerJoinAndMapOne(
          "connection.destination",
          Destinations,
          "destination",
          "destination.id = connection.destination_id",
        )
        .where("connection.id = :id", { id })
        .andWhere("connection.account_id = :account_id", { account_id })
        .getOne();

      if (!connection) {
        throw new HttpException("Connection not found", HttpStatus.NOT_FOUND);
      }

      return connection;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllConnections(account_id: string) {
    try {
      const connections = await this.sourceDestinationRepo
        .createQueryBuilder("connection")
        .innerJoinAndMapOne(
          "connection.source",
          Sources,
          "source",
          "source.id = connection.source_id",
        )
        .innerJoinAndMapOne(
          "connection.destination",
          Destinations,
          "destination",
          "destination.id = connection.destination_id",
        )
        .where("connection.account_id = :account_id", { account_id })
        .orderBy("connection.created_at", "DESC")
        .getMany();

      return connections;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllConnectionsBySourceId(source_id: string, account_id: string) {
    try {
      const connections = await this.sourceDestinationRepo
        .createQueryBuilder("connection")
        .innerJoinAndMapOne(
          "connection.source",
          Sources,
          "source",
          "source.id = connection.source_id",
        )
        .innerJoinAndMapOne(
          "connection.destination",
          Destinations,
          "destination",
          "destination.id = connection.destination_id",
        )
        .where("connection.source_id = :source_id", { source_id })
        .andWhere("connection.account_id = :account_id", { account_id })
        .orderBy("connection.created_at", "DESC")
        .getMany();

      return connections;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllConnectionsByDestinationId(
    destination_id: string,
    account_id: string,
  ) {
    try {
      const connections = await this.sourceDestinationRepo
        .createQueryBuilder("connection")
        .innerJoinAndMapOne(
          "connection.source",
          Sources,
          "source",
          "source.id = connection.source_id",
        )
        .innerJoinAndMapOne(
          "connection.destination",
          Destinations,
          "destination",
          "destination.id = connection.destination_id",
        )
        .where("connection.destination_id = :destination_id", {
          destination_id,
        })
        .andWhere("connection.account_id = :account_id", { account_id })
        .orderBy("connection.created_at", "DESC")
        .getMany();

      return connections;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async enableDisableConnection(id: string, account_id: string) {
    try {
      const connection = await this.getConnectionById(id, account_id);

      if (!connection) {
        throw new HttpException("Connection not found", HttpStatus.NOT_FOUND);
      }

      await this.sourceDestinationRepo
        .createQueryBuilder()
        .update()
        .set({ is_active: !connection.is_active })
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Connection updated successfully",
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

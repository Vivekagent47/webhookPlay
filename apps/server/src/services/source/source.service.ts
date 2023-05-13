import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sources } from "src/entities";
import { Repository } from "typeorm";
import { CreateSourceDto, UpdateSourceDto } from "src/dtos";
import { ConnectionService } from "../connections";
import { createId } from "src/utiles";

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Sources) private sourceRepo: Repository<Sources>,

    @Inject(forwardRef(() => ConnectionService))
    private readonly connectionService: ConnectionService,
  ) {}

  async create(createSourceData: CreateSourceDto, account_id: string) {
    try {
      const prvSource = await this.sourceRepo
        .createQueryBuilder()
        .where("account_id = :account_id", { account_id })
        .andWhere("name = :name", { name: createSourceData.name })
        .getOne();

      if (prvSource) {
        throw new HttpException(
          "Source with this name already exists",
          HttpStatus.FORBIDDEN,
        );
      }

      return this.sourceRepo.save({
        id: createId("src_"),
        account_id,
        ...createSourceData,
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
      return this.sourceRepo
        .createQueryBuilder()
        .where("account_id = :account_id", { account_id })
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
      const source = await this.sourceRepo
        .createQueryBuilder()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .getOne();

      if (!source) {
        throw new HttpException("Source not found", HttpStatus.NOT_FOUND);
      }

      return source;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateSourceData: UpdateSourceDto,
    account_id: string,
  ) {
    try {
      const source = await this.findOne(id, account_id);

      await this.sourceRepo
        .createQueryBuilder()
        .update()
        .set(updateSourceData)
        .where("id = :id", { id: source.id })
        .andWhere("account_id = :account_id", { account_id: source.account_id })
        .execute();

      return {
        message: "Source updated successfully",
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
      await this.connectionService.removeConnectionBySourceId(id, account_id);

      await this.sourceRepo
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .execute();

      return {
        message: "Source deleted successfully",
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

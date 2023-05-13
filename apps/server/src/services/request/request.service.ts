import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRequestDto } from "src/dtos";
import { Request, Sources } from "src/entities";
import { createId } from "src/utiles";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto, account_id: string) {
    try {
      return await this.requestRepository.save({
        id: createId("req_"),
        ...createRequestDto,
        account_id,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(account_id: string, page: number) {
    try {
      if (page < 1) {
        page = 1;
      }

      const totalRequests = await this.requestRepository.count({
        where: { account_id },
      });

      const requests = await this.requestRepository
        .createQueryBuilder("req")
        .innerJoinAndMapOne(
          "req.source",
          Sources,
          "source",
          "source.id = req.source_id",
        )
        .where("req.account_id = :account_id", { account_id })
        .orderBy("req.created_at", "DESC")
        .limit(30)
        .offset((page - 1) * 30)
        .getMany();

      return { data: requests, total: Math.ceil(totalRequests / 30) };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string, account_id: string) {
    try {
      const request = await this.requestRepository
        .createQueryBuilder()
        .where("id = :id", { id })
        .andWhere("account_id = :account_id", { account_id })
        .getOne();

      if (!request) {
        throw new HttpException("Request not found", HttpStatus.NOT_FOUND);
      }

      return request;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRequestsBySourceId(
    source_id: string,
    account_id: string,
    page: number,
  ) {
    try {
      if (page < 1) {
        page = 1;
      }

      const totalRequests = await this.requestRepository.count({
        where: { account_id, source_id },
      });

      const requests = await this.requestRepository
        .createQueryBuilder("req")
        .innerJoinAndMapOne(
          "req.source",
          Sources,
          "source",
          "source.id = req.source_id",
        )
        .where("req.source_id = :source_id", { source_id })
        .andWhere("req.account_id = :account_id", { account_id })
        .orderBy("req.created_at", "DESC")
        .limit(30)
        .offset((page - 1) * 30)
        .getMany();

      return {
        total: Math.ceil(totalRequests / 30),
        data: requests,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

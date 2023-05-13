import {
  HttpException,
  Injectable,
  HttpStatus,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axios from "axios";
import {
  Attempts,
  AttemptsStatusType,
  DestinationType,
  Destinations,
  EventStatusType,
} from "src/entities";
import { DestinationService } from "../destination";
import { EventService } from "../event";
import { RequestService } from "../request";
import { createId } from "src/utiles";

@Injectable()
export class AttemptService {
  constructor(
    @InjectRepository(Attempts)
    private attemptsRepository: Repository<Attempts>,

    private readonly destinationService: DestinationService,
    private readonly requestService: RequestService,

    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  async create(request_id: string, event_id: string, account_id: string) {
    try {
      const event = await this.eventService.findOne(event_id, account_id);

      const destination = await this.destinationService.findOne(
        event.destination_id,
        account_id,
      );

      if (destination.type === DestinationType.HTTP) {
        return await this.sendToHttp(
          destination,
          request_id,
          event.id,
          account_id,
        );
      } else if (destination.type === DestinationType.CLI) {
        return await this.sendToCLI();
      } else {
        throw new HttpException(
          "Destination type not found",
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendToHttp(
    destination: Destinations,
    request_id: string,
    event_id: string,
    account_id: string,
  ) {
    try {
      const request = await this.requestService.findOne(request_id, account_id);

      let status: AttemptsStatusType;
      let status_code: number;

      delete request.headers["host"];
      delete request.headers["content-length"];

      const res = await axios({
        method: "POST",
        url: destination.url,
        data: request.body,
        headers: request.headers,
      })
        .then((res) => {
          status = AttemptsStatusType.SUCCESS;
          status_code = res.status;
          return res.data;
        })
        .catch((err) => {
          status = AttemptsStatusType.ERROR;
          if (!err.status) {
            status_code = 500;
            return {
              status: 500,
              message: err.code,
            };
          } else {
            status_code = err.response.status;
            return err.response.data;
          }
        });

      const attemp = await this.attemptsRepository.save({
        id: createId("atmp"),
        event_id: event_id,
        destination_id: destination.id,
        request_id: request_id,
        account_id: account_id,
        response: res || {},
        status_type: status,
        status_code: status_code,
      });

      await this.eventService.updateStatus(event_id, account_id, {
        status_code: status_code,
        status_type:
          status === AttemptsStatusType.SUCCESS
            ? EventStatusType.SUCCESS
            : EventStatusType.ERROR,
      });

      return attemp;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendToCLI() {
    try {
      return;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(account_id: string) {
    try {
      const attempts = await this.attemptsRepository
        .createQueryBuilder()
        .where("account_id = :account_id", { account_id: account_id })
        .orderBy("created_at", "DESC")
        .getMany();

      return attempts;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string, account_id: string) {
    try {
      const attempt = await this.attemptsRepository
        .createQueryBuilder()
        .where("id = :id", { id: id })
        .andWhere("account_id = :account_id", { account_id: account_id })
        .getOne();

      if (!attempt) {
        throw new HttpException("Attempt not found", HttpStatus.NOT_FOUND);
      }

      return attempt;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByRequestId(request_id: string, account_id: string) {
    try {
      const attempts = await this.attemptsRepository
        .createQueryBuilder()
        .where("request_id = :request_id", { request_id: request_id })
        .andWhere("account_id = :account_id", { account_id: account_id })
        .orderBy("created_at", "DESC")
        .getMany();

      return attempts;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEventId(event_id: string, account_id: string) {
    try {
      const attempts = await this.attemptsRepository
        .createQueryBuilder()
        .where("event_id = :event_id", { event_id: event_id })
        .andWhere("account_id = :account_id", { account_id: account_id })
        .orderBy("created_at", "DESC")
        .getMany();

      return attempts;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

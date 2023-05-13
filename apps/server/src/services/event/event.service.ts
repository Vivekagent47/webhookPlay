import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  Events,
  EventStatusType,
  Destinations,
  Request,
  Sources,
} from "src/entities";
import { ConnectionService } from "../connections";
import { AttemptService } from "../attempt";
import { createId } from "src/utiles";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,

    private readonly connectionService: ConnectionService,

    @Inject(forwardRef(() => AttemptService))
    private readonly attemptService: AttemptService,
  ) {}

  async create(source_id: string, request_id: string, account_id: string) {
    try {
      const connect = await this.connectionService.getAllConnectionsBySourceId(
        source_id,
        account_id,
      );

      if (connect.length <= 0) {
        throw new HttpException("Connection not found", HttpStatus.BAD_REQUEST);
      }

      connect.forEach(async (connection) => {
        const event = await this.eventsRepository.save({
          id: createId("evt_"),
          destination_id: connection.destination_id,
          request_id: request_id,
          account_id: account_id,
        });

        if (connection.is_active) {
          await this.attemptService.create(request_id, event.id, account_id);
        } else {
          await this.updateStatus(event.id, account_id, {
            status_code: 0,
            status_type: EventStatusType.PAUSE,
          });
        }
      });

      return {
        status: HttpStatus.OK,
        message: "Event created",
      };
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

      const totalEventts = await this.eventsRepository.count({
        where: {
          account_id: account_id,
        },
      });

      const events = await this.eventsRepository
        .createQueryBuilder("evt")
        .innerJoinAndMapOne(
          "evt.destination",
          Destinations,
          "destination",
          "destination.id = evt.destination_id",
        )
        .where("evt.account_id = :account_id", { account_id: account_id })
        .orderBy("evt.created_at", "DESC")
        .limit(30)
        .offset((page - 1) * 30)
        .getMany();

      return {
        total: Math.ceil(totalEventts / 30),
        data: events,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string, account_id: string) {
    try {
      const event = await this.eventsRepository
        .createQueryBuilder("evt")
        .innerJoinAndMapOne(
          "evt.destination",
          Destinations,
          "destination",
          "destination.id = evt.destination_id",
        )
        .innerJoinAndMapOne(
          "evt.request",
          Request,
          "request",
          "request.id = evt.request_id",
        )
        .innerJoinAndMapOne(
          "request.source",
          Sources,
          "source",
          "source.id = request.source_id",
        )
        .where("evt.id = :id", { id: id })
        .andWhere("evt.account_id = :account_id", { account_id: account_id })
        .orderBy("evt.created_at", "DESC")
        .getOne();

      if (!event) {
        throw new HttpException("Event not found", HttpStatus.BAD_REQUEST);
      }

      return event;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStatus(
    id: string,
    account_id: string,
    {
      status_code,
      status_type,
    }: { status_code: number; status_type: EventStatusType },
  ) {
    try {
      const event = await this.findOne(id, account_id);

      if (!event) {
        throw new HttpException("Event not found", HttpStatus.BAD_REQUEST);
      }

      await this.eventsRepository
        .createQueryBuilder()
        .update()
        .set({
          status_code: status_code,
          status_type: status_type,
        })
        .where("id = :id", { id: id })
        .execute();

      return {
        status: HttpStatus.OK,
        message: "Event updated successfully",
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByRequestId(request_id: string, account_id: string) {
    try {
      const events = await this.eventsRepository
        .createQueryBuilder("evt")
        .innerJoinAndMapOne(
          "evt.destination",
          Destinations,
          "destination",
          "destination.id = evt.destination_id",
        )
        .innerJoinAndMapOne(
          "evt.request",
          Request,
          "request",
          "request.id = evt.request_id",
        )
        .innerJoinAndMapOne(
          "request.source",
          Sources,
          "source",
          "source.id = request.source_id",
        )
        .where("evt.request_id = :request_id", { request_id: request_id })
        .andWhere("evt.account_id = :account_id", { account_id: account_id })
        .orderBy("evt.created_at", "DESC")
        .getMany();

      return events;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByDestinationId(
    destination_id: string,
    account_id: string,
    page: number,
  ) {
    try {
      if (page < 1) {
        page = 1;
      }

      const totalEventts = await this.eventsRepository.count({
        where: {
          account_id: account_id,
          destination_id: destination_id,
        },
      });

      const events = await this.eventsRepository
        .createQueryBuilder("evt")
        .innerJoinAndMapOne(
          "evt.destination",
          Destinations,
          "destination",
          "destination.id = evt.destination_id",
        )
        .innerJoinAndMapOne(
          "evt.request",
          Request,
          "request",
          "request.id = evt.request_id",
        )
        .innerJoinAndMapOne(
          "request.source",
          Sources,
          "source",
          "source.id = request.source_id",
        )
        .where("evt.destination_id = :destination_id", {
          destination_id: destination_id,
        })
        .andWhere("evt.account_id = :account_id", { account_id: account_id })
        .orderBy("evt.created_at", "DESC")
        .limit(30)
        .offset((page - 1) * 30)
        .getMany();

      return {
        total: Math.ceil(totalEventts / 30),
        data: events,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

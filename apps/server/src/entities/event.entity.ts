import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum EventStatusType {
  SUCCESS = "success",
  ERROR = "error",
  PAUSE = "pause",
}

@Entity("events")
@Index(["destination_id", "request_id"])
@Index(["destination_id", "account_id"])
@Index(["request_id", "account_id"])
@Index(["account_id"])
export class Events extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  destination_id: string;

  @Column()
  request_id: string;

  @Column()
  account_id: string;

  @Column({ nullable: true })
  status_code: number;

  @Column({ type: "enum", enum: EventStatusType, nullable: true })
  status_type: EventStatusType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

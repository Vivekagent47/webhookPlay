import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum AttemptsStatusType {
  SUCCESS = "success",
  ERROR = "error",
}

@Entity("attempts")
@Index(["destination_id", "request_id"])
@Index(["destination_id", "event_id"])
@Index(["destination_id", "account_id"])
@Index(["request_id", "event_id"])
@Index(["request_id", "account_id"])
@Index(["event_id", "account_id"])
@Index(["account_id"])
export class Attempts extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  account_id: string;

  @Column()
  destination_id: string;

  @Column()
  request_id: string;

  @Column()
  event_id: string;

  @Column()
  status_code: number;

  @Column({ type: "enum", enum: AttemptsStatusType })
  status_type: AttemptsStatusType;

  @Column("json")
  response: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

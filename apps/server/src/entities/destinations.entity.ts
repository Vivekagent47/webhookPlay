import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum DestinationType {
  CLI = "cli",
  HTTP = "http",
}

@Entity("destinations")
@Index(["account_id", "name"], { unique: true })
@Index(["account_id"])
export class Destinations extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: "enum", enum: DestinationType })
  type: DestinationType;

  @Column()
  account_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

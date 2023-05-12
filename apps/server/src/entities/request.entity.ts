import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("requests")
@Index(["source_id", "account_id"])
export class Request extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("json", { nullable: true })
  headers: object;

  @Column("json", { nullable: true })
  body: object;

  @Column()
  source_id: string;

  @Column()
  account_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
  Index,
} from "typeorm";

@Entity("accounts")
@Index(["company_name"])
export class Accounts extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  company_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

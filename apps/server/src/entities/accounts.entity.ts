import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
} from "typeorm";

@Entity("accounts")
export class Accounts extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

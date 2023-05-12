import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum AccountUserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

@Entity("account_users")
@Index(["account_id", "user_id"], { unique: true })
@Index(["account_id"])
@Index(["user_id"])
export class AccountUsers extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  account_id: string;

  @Column({ type: "enum", enum: AccountUserRole })
  role: AccountUserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

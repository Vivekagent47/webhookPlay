import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("source_destinations")
@Index(["source_id", "destination_id"], { unique: true })
@Index(["account_id"])
export class SourceDestination extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  source_id: string;

  @Column()
  destination_id: string;

  @Column()
  account_id: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

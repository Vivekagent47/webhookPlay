import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Column,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

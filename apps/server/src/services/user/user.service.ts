import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO, UpdateUserDTO } from "src/dtos";
import { User } from "src/entities";
import { createId } from "src/utiles";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(userData: CreateUserDTO) {
    try {
      const newUser = this.userRepository.create({
        ...userData,
        id: createId("user"),
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, newUserData: UpdateUserDTO) {
    try {
      const user = await this.findById(id);
      if (!user)
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);

      await this.userRepository.update(id, newUserData);

      return {
        ...user,
        ...newUserData,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

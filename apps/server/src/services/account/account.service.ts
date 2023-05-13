import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountUserRole, AccountUsers, Accounts, User } from "src/entities";
import { CreateAccountDTO, UpdateAccountDTO } from "src/dtos";
import { UserService } from "../user";
import { createId } from "src/utiles";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,
    @InjectRepository(AccountUsers)
    private readonly accountUsersRepository: Repository<AccountUsers>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findByName(name: string) {
    try {
      return await this.accountsRepository.findOne({
        where: { name: name },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string) {
    try {
      return await this.accountsRepository.findOne({
        where: { id },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createAccount(account: CreateAccountDTO, user_id: string) {
    try {
      const oldAccount = await this.findByName(account.name);
      if (oldAccount) {
        throw new HttpException("Account already exists", HttpStatus.FORBIDDEN);
      }

      const oldUser = await this.userService.findById(user_id);
      if (!oldUser) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const newAccount = this.accountsRepository.create({
        ...account,
        id: createId("account"),
      });

      await this.accountsRepository.save(newAccount);

      const newAccountUser = this.accountUsersRepository.create({
        id: createId("account_user"),
        account_id: newAccount.id,
        user_id: oldUser.id,
        role: AccountUserRole.ADMIN,
      });

      await this.accountUsersRepository.save(newAccountUser);

      return newAccount;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAccount(account: UpdateAccountDTO, account_id: string) {
    try {
      const oldAccount = await this.findById(account_id);
      if (!oldAccount) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      }

      await this.accountsRepository.update(
        { id: account_id },
        {
          ...account,
        },
      );

      return {
        ...oldAccount,
        ...account,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserAccounts(user_id: string) {
    try {
      const oldUser = await this.userService.findById(user_id);
      if (!oldUser) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      return await this.accountUsersRepository
        .createQueryBuilder("account_user")
        .innerJoinAndMapOne(
          "account_user.account",
          Accounts,
          "account",
          "account.id = account_user.account_id",
        )
        .where("account_user.user_id = :user_id", { user_id })
        .getMany();
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAccountUsers(account_id: string) {
    try {
      const oldAccount = await this.findById(account_id);
      if (!oldAccount) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      }

      return await this.accountUsersRepository
        .createQueryBuilder("account_user")
        .innerJoinAndMapOne(
          "account_user.user",
          User,
          "user",
          "user.id = account_user.user_id",
        )
        .where("account_user.account_id = :account_id", { account_id })
        .getMany();
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRole(account_id: string, user_id: string) {
    try {
      const accountUser = await this.accountUsersRepository.findOne({
        where: { account_id, user_id },
      });

      if (!accountUser) {
        throw new HttpException("Account user not found", HttpStatus.NOT_FOUND);
      }

      return accountUser.role;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

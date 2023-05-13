import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import { CreateUserDTO, LoginUserDTO } from "src/dtos";
import { User } from "src/entities";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  async register(userData: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(userData);
      const token = await this.generateAuthToken(user);
      return { user, token };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(userData: LoginUserDTO) {
    try {
      const user = await this.userService.findByEmail(userData.email);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await user.validatePassword(userData.password);
      if (!isPasswordValid) {
        throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
      }

      const token = await this.generateAuthToken(user);
      return { user, token };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateAuthToken(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const accessToken = this.jwtService.sign({
      sub: () => user.email,
      type: "access",
      email: user.email,
      user_id: user.id,
    });

    const refreshToken = this.jwtService.sign(
      {
        sub: () => user.email,
        type: "refresh",
        user_id: user.id,
      },
      {
        expiresIn: "7d",
      },
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<{
    user: User;
    token: { access_token: string; refresh_token: string };
  }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const user = await this.userService.findById(decoded.user_id);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const token = await this.generateAuthToken(user);
      return { user, token };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

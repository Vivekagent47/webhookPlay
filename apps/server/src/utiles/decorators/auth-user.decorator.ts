import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface IAuthUserDecorator {
  type: string;
  email: string;
  user_id: string;
  iat: number;
  exp: number;
}

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);

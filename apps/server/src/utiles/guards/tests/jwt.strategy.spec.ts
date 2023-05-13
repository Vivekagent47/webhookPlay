import { JwtStrategy } from "../jwt.strategy";
import { Test, TestingModule } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

describe("JwtStrategy", () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: "jwt",
        }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: "3600s" },
        }),
      ],
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it("should be defined", () => {
    expect(strategy).toBeDefined();
  });

  it("should validate", async () => {
    const payload = {
      email: "jhon.doe@gmailk.com",
      type: "access",
      userId: 1,
    };
    const result = await strategy.validate(payload);
    expect(result).toEqual(payload);
  });
});

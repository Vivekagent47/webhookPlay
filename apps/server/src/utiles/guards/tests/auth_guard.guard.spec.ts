import { Test } from "@nestjs/testing";
import { UserAuthGuard } from "../auth_guard.guard";

describe("UserAuthGuard", () => {
  let guard: UserAuthGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserAuthGuard],
    }).compile();

    guard = moduleRef.get<UserAuthGuard>(UserAuthGuard);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });
});

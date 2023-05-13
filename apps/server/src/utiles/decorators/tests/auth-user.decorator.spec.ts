import { ExecutionContext } from "@nestjs/common";
import { AuthUser } from "../auth-user.decorator";

describe("AuthUser", () => {
  it("should return the user object from the request", () => {
    // Arrange
    const user = {
      type: "access",
      email: "user@example.com",
      user_id: "123",
      iat: 1620404138,
      exp: 1620407738,
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user,
        }),
      }),
    } as ExecutionContext;

    const result = AuthUser(null, context);

    expect(result).toBeDefined();
  });
});

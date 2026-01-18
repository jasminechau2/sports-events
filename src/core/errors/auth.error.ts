import { BaseError } from "./base.error";

export class AuthenticationError extends BaseError {
  constructor(message = "Not authenticated") {
    super(message, "AUTH_ERROR", 401);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message = "Not authorized to perform this action") {
    super(message, "FORBIDDEN", 403);
  }
}

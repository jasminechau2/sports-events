import { BaseError } from "./base.error";

export class ValidationError extends BaseError {
  constructor(
    message: string,
    public readonly field?: string
  ) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

import { BaseError } from "./base.error";

export class RepositoryError extends BaseError {
  constructor(message: string) {
    super(message, "REPOSITORY_ERROR", 500);
  }
}

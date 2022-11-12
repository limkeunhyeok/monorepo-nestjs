import { ExceptionCode } from "./exception-code";

export interface IException {
  code: ExceptionCode;
}

export class CustomException extends Error implements IException {
  public readonly code: ExceptionCode;

  constructor(message?: string, error?: Error, code?: ExceptionCode) {
    super(message);

    this.code = code ?? ExceptionCode.SERVER_ERROR;
    Object.setPrototypeOf(this, new.target.prototype);

    if (error) {
      this.name = error.name;
      this.message = error.message;
      this.stack = error.stack;
    } else {
      this.name = Object.getPrototypeOf(this).constructor.name;
      this.message = String(message);
    }
  }
}

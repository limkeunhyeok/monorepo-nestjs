import { HttpStatus } from "@nestjs/common";

export class ExceptionCode {
  // 400
  public static SCHEMA_VALIDATE = new ExceptionCode(
    "SchemaValidate",
    HttpStatus.BAD_REQUEST
  );
  public static BAD_MIMETYPE = new ExceptionCode(
    "BadMimetype",
    HttpStatus.BAD_REQUEST
  );

  // 401
  public static NEED_AUTHORIZATION_INFO = new ExceptionCode(
    "NeedAuthorizationInfo",
    HttpStatus.UNAUTHORIZED
  );
  public static NEED_LOGIN = new ExceptionCode(
    "NeedLogin",
    HttpStatus.UNAUTHORIZED
  );
  public static LOGIN_FAIL = new ExceptionCode(
    "LoginFail",
    HttpStatus.UNAUTHORIZED
  );
  public static VERIFY_TOKEN_FAIL = new ExceptionCode(
    "VerifyTokenFail",
    HttpStatus.UNAUTHORIZED
  );
  public static EXPIRED_TOKEN = new ExceptionCode(
    "ExpiredToken",
    HttpStatus.UNAUTHORIZED
  );
  public static NEED_REGISTER = new ExceptionCode(
    "NeedRegister",
    HttpStatus.UNAUTHORIZED
  );
  public static NEED_TOKEN = new ExceptionCode(
    "NeedToken",
    HttpStatus.UNAUTHORIZED
  );

  // 402
  public static SHORT_OF_CASH = new ExceptionCode(
    "ShortOfCash",
    HttpStatus.PAYMENT_REQUIRED
  );

  // 403
  public static AUTHORIZATION_DENY = new ExceptionCode(
    "AuthorizationDeny",
    HttpStatus.FORBIDDEN
  );
  public static ROLE_PERMISSION = new ExceptionCode(
    "RolePermission",
    HttpStatus.FORBIDDEN
  );

  // 404
  public static NOT_FOUND_API = new ExceptionCode(
    "NotFoundApi",
    HttpStatus.NOT_FOUND
  );
  public static NOT_FOUND_RESOURCE = new ExceptionCode(
    "NotFoundResource",
    HttpStatus.NOT_FOUND
  );

  // 406
  public static PARSING_FAIL = new ExceptionCode(
    "ParsingFail",
    HttpStatus.NOT_ACCEPTABLE
  );

  // 409
  public static DUPLICATED_ID = new ExceptionCode(
    "DuplicatedId",
    HttpStatus.CONFLICT
  );
  public static DUPLICATED_NAME = new ExceptionCode(
    "DuplicatedName",
    HttpStatus.CONFLICT
  );
  public static DUPLICATED_RESOURCE = new ExceptionCode(
    "DuplicatedResource",
    HttpStatus.CONFLICT
  );

  // 429
  public static REQUEST_IN_PROGRESS = new ExceptionCode(
    "RequestInProgress",
    HttpStatus.TOO_MANY_REQUESTS
  );
  public static TOO_MANY_REQUESTS = new ExceptionCode(
    "TooManyRequests",
    HttpStatus.TOO_MANY_REQUESTS
  );

  // 500
  public static JSON_PARSING = new ExceptionCode(
    "JsonParsing",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
  public static INVALID_INPUT = new ExceptionCode(
    "InvalidInput",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
  public static DB_FAIL = new ExceptionCode(
    "DBFail",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
  public static SERVER_ERROR = new ExceptionCode(
    "ServerError",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
  public static DATA_SEND_FAIL = new ExceptionCode(
    "DataSendFail",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
  public static INTERNAL_STATE_VIOLATION = new ExceptionCode(
    "StatusPolicyViolation",
    HttpStatus.INTERNAL_SERVER_ERROR
  );

  // 503
  public static SERVICE_UNAVAILABLE = new ExceptionCode(
    "ServiceUnavailable",
    HttpStatus.SERVICE_UNAVAILABLE
  );
  public static GATEWAY_ERROR = new ExceptionCode(
    "GatewayError",
    HttpStatus.SERVICE_UNAVAILABLE
  );

  // 504
  public static GATEWAY_TIMEOUT = new ExceptionCode(
    "GatewayTimeout",
    HttpStatus.GATEWAY_TIMEOUT
  );

  public readonly statusCode: string;

  constructor(
    public readonly code: string,
    public readonly status: HttpStatus
  ) {
    this.statusCode = HttpStatus[status];
  }
}

import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { CustomException, ExceptionCode } from "../exceptions";

export interface TokenPayload {
  userId: string;
}

export const createToken = (
  payload: TokenPayload,
  options?: SignOptions
): string => {
  return sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d",
    ...options,
  });
};

export const verifyToken = (
  token: string,
  options?: VerifyOptions
): TokenPayload => {
  try {
    return verify(token, process.env.JWT_SECRET, {
      ...options,
    }) as TokenPayload;
  } catch (error) {
    throw new CustomException(
      error.message,
      error,
      ExceptionCode.VERIFY_TOKEN_FAIL
    );
  }
};

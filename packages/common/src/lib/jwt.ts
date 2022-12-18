import { UnauthorizedException } from "@nestjs/common";
import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

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
    throw new UnauthorizedException(error);
  }
};

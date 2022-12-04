import { RoleEnum } from '@common/server';

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: number;
  type: RoleEnum;
}

import jwt from 'jsonwebtoken';
import config from '@/config/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { sign } = jwt;

export const createAccessToken = (userId: number | string): string => {
  return sign({ userId }, config.jwt.access_token.secret);
};

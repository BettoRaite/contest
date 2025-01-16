import * as dotenv from 'dotenv';
import path from 'node:path';
import z from 'zod';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().default('4000'),
  SERVER_URL: z.string(),
  CORS_ORIGIN: z.string().default('*'),
  ACCESS_TOKEN_SECRET: z.string().min(8),
  ACCESS_TOKEN_EXPIRE: z.string().default('20m'),
  REFRESH_TOKEN_SECRET: z.string().min(8),
  REFRESH_TOKEN_EXPIRE: z.string().default('1d'),
  REFRESH_TOKEN_COOKIE_NAME: z.string().default('jid'),
  POSTGRES_DATABASE: z.string(),
  MYSQL_ROOT_PASSWORD: z.any().optional(), // Use .optional() for optional fields
  DATABASE_URL: z.string()
});

const validatedEnv = envSchema.parse(process.env); // Validate the environment variables
const config = {
  node_env: validatedEnv.NODE_ENV,
  server: {
    port: validatedEnv.PORT,
    url: validatedEnv.SERVER_URL
  },
  cors: {
    cors_origin: validatedEnv.CORS_ORIGIN
  },
  jwt: {
    access_token: {
      secret: validatedEnv.ACCESS_TOKEN_SECRET,
      expire: validatedEnv.ACCESS_TOKEN_EXPIRE
    },
    refresh_token: {
      secret: validatedEnv.REFRESH_TOKEN_SECRET,
      expire: validatedEnv.REFRESH_TOKEN_EXPIRE,
      cookie_name: validatedEnv.REFRESH_TOKEN_COOKIE_NAME
    }
  }
} as const;
export default config;

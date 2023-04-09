import { safeGetEnv } from "@./common";

export const SERVER_CONFIG = {
  DATABASE_URL: safeGetEnv("DATABASE_URL"),
  CLIENT_URL: safeGetEnv(`CLIENT_URL`),
  COOKIE_SECRET: safeGetEnv(`COOKIE_SECRET`),
  KAKAO_CLIENT_ID: safeGetEnv("KAKAO_CLIENT_ID"),
  KAKAO_CALLBACK_URL: safeGetEnv("KAKAO_CALLBACK_URL"),
  DOMAIN: safeGetEnv("DOMAIN"),
};

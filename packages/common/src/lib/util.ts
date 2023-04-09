import * as process from 'process';

export const safeGetEnv = (envName: string) => {
  console.log("LOADINNG ENV", envName)
  const value = process.env[envName];

  if (value) {
    console.log(`LOAD ENV key = ${envName}, value = ${value}`)
    return value;
  }

  throw new Error(`${envName}이란 환경 변수는 존재하지 않습니다.`);
};

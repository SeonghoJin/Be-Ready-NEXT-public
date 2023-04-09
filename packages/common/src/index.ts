export * from "./lib/request.response.types/index";
export * from "./lib/types/index";
export * from "./lib/domain";
export * from "./lib/util";
import * as chalkModule from "chalk";

export * as schedule from "node-schedule";

export const timer = (time: number) => new Promise((res) => setTimeout(res, time));

export const chalk = new chalkModule.Instance();

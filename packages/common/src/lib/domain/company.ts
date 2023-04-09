import { ExtractTypeOfArray } from "../types";

export const companyName = [
  // "Coupang",
  // "Daangn",
  "Kakao",
  // "Line",
  "Naver",
  "Nexon",
  "ToastUI",
  "Toss",
  "Baemin"
] as const;
export type CompanyNameType = ExtractTypeOfArray<typeof companyName>;

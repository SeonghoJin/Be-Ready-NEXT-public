import { ExtractTypeOfArray } from "../types/index";

const tagNames = ["Frontend", "Backend", "ETC"] as const;
export type TagNameType = ExtractTypeOfArray<typeof tagNames>;

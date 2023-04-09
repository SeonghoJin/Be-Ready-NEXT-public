import { GetNewBlogItem } from "./GetNewBlogItem";
import { GetNewBlogItemList } from "./GetNewBlogItemList";

export type BlogInspectorApi = (GetNewBlogItem | undefined) & GetNewBlogItemList;

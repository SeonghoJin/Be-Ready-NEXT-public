import { BlogItem } from './TechBlogInspector';

export interface GetNewBlogItemList {
  getNewBlogItemList(): Promise<BlogItem[]>;
}

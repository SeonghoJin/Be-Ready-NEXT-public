import { BlogItem } from './TechBlogInspector';

export interface GetNewBlogItem {
  getNewBlogItem(url: string): Promise<BlogItem>;
}

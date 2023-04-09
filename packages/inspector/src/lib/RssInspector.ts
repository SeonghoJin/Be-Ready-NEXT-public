import { BlogInspectorApi } from "./BlogInspectorApi";
import { BlogItem, TechBlogInspectorConstructorArg } from "./TechBlogInspector";

export abstract class RssInspector implements BlogInspectorApi {

  public abstract getNewBlogItemList: () => Promise<BlogItem[]>;
  protected htmlClient: TechBlogInspectorConstructorArg["htmlClient"];
  protected company: TechBlogInspectorConstructorArg["company"];

  constructor({ htmlClient, company }: TechBlogInspectorConstructorArg) {
    this.htmlClient = htmlClient;
    this.company = company;
  }

  public getNewBlogItem(url: string): Promise<BlogItem> {
    throw new Error("not used function");
  }

}


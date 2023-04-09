import { Company, CompanyArticleDto } from "@./common";
import { GetHtmlClient } from "@./fetcher";
import { BlogInspectorApi } from "./BlogInspectorApi";

export type BlogItem = Pick<
  CompanyArticleDto,
  "title" | "company" | "createdAt" | "href" | "description"
> & {
  rawText: string;
};

export type TechBlogInspectorConstructorArg = {
  htmlClient: GetHtmlClient;
  company: Pick<Company, "basePath" | "rssUrl" | "href" | "name" | "imageUrl" | "id">
};

export abstract class TechBlogInspector implements BlogInspectorApi {
  protected abstract parseArticle: (
    articleHtml: string
  ) => Omit<BlogItem, "href">;
  protected abstract getNewArticleUrlList: () => Promise<string[]>;
  protected htmlClient: TechBlogInspectorConstructorArg["htmlClient"];
  protected company: TechBlogInspectorConstructorArg["company"];

  constructor({ htmlClient, company }: TechBlogInspectorConstructorArg) {
    this.htmlClient = htmlClient;
    this.company = company;
  }

  public getNewBlogItemList = async (): Promise<BlogItem[]> => {
    const urlList = await this.getNewArticleUrlList();
    console.info("urlList = ", urlList);

    const newBlogItemList = [];

    for (const url of urlList) {
      const blogItem = await this.getNewBlogItem(url);
      newBlogItemList.push(blogItem);
    }

    return newBlogItemList;
  };

  public getNewBlogItem = async (url: string): Promise<BlogItem> => {
    const html = await this.loadArticleHTML(url);
    const parseArticle = await this.parseArticle(html);
    return {
      ...parseArticle,
      href: url
    };
  };

  protected getBasicBlogItemByArticleHome = <T extends (Partial<BlogItem> | undefined) = undefined>(): T | null => {
    return null;
  };

  protected loadArticleHTML = async (articleUrl: string): Promise<string> => {
    console.info(
      `[${this.company.name} INSPECTOR] LOAD ARTICLE OF ${articleUrl}`
    );
    return await this.htmlClient.getHtml(articleUrl);
  };

  protected loadArticleListHTML = async () => {
    console.info(
      `[${this.company.name} INSPECTOR] LOAD ARTICLE LIST OF ${this.company.href}`
    );
    return await this.htmlClient.getHtml(this.company.href);
  };
}

import { BlogItem, TechBlogInspector } from "./TechBlogInspector";
import * as cheerio from "cheerio";

export class ToastUITechBlogInspector extends TechBlogInspector {
  protected getNewArticleUrlList = async (): Promise<string[]> => {
    const html = await this.loadArticleListHTML();

    const $ = cheerio.load(html);

    const urlList = $(".sc-uiq08u-3.gjLhLL > a")
      .get()
      .map((element) => {
        return `${this.company.basePath}${element.attribs["href"]}`;
      });

    return urlList;
  };

  protected parseArticle = (articleHtml: string): Omit<BlogItem, "href"> => {
    const $ = cheerio.load(articleHtml);

    const title = $("meta[property='og:title']")
      .get()
      .map((item) => {
        return item.attribs["content"];
      })[0];
    const createdAt = $(".sc-i4u6ml-2.ctYSiN")
      .last()
      .text()
      .replace(/\./g, "-");
    const rawText = $(".sc-1j208y2-0.sc-1y6y9ko-3.LiyHL.hJvZxB p").text();
    const description = $("meta[property='og:description']")
      .get()
      .map((item) => {
        return item.attribs["content"];
      })[0];

    return {
      company: this.company,
      title,
      createdAt,
      description,
      rawText
    };
  };
}

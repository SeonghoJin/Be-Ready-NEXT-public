import { BlogItem, TechBlogInspector } from "./TechBlogInspector";
import * as cherrio from "cheerio";

export class NexonTechBlogInspector extends TechBlogInspector {

  protected parseArticle = (articleHtml: string): Omit<BlogItem, "href"> => {
    const $ = cherrio.load(articleHtml);

    const title = $("head > title ").text();
    const createdAt = $("div[style='line-height:1.5;white-space:pre-wrap;word-break:normal;pointer-events:none']").first().text().replace(/[./]/gi, "-");
    const rawText = $(".css-1g4vl24").contents().not("style").text();
    const description = rawText.slice(0, 300);

    return {
      company: this.company,
      title,
      createdAt,
      description,
      rawText
    };
  };

  protected getNewArticleUrlList = async (): Promise<string[]> => {
    const html = await this.loadArticleListHTML();
    const $ = cherrio.load(html);

    const urlList = $("div[data-block-id='38e34086-af5b-4411-823c-bce159510f79'] > .notion-page-block.notion-collection-item.css-qx0h3z > a")
      .get()
      .map((item) => {
        return `${this.company.basePath}${item.attribs["href"]}`;
      });

    return urlList;
  };
}

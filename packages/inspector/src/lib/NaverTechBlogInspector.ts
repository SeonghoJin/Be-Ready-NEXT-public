import { BlogItem, TechBlogInspector } from "./TechBlogInspector";
import * as cherrio from "cheerio";

export class NaverTechBlogInspector extends TechBlogInspector {

  protected parseArticle = (articleHtml: string): Omit<BlogItem, "href"> => {
    const $ = cherrio.load(articleHtml);

    const title = $("h1.posting_tit").text();
    const createdAt = $(".post_info > dd").first().text().replace(/\./gi, "-");
    const rawText = $(".con_view").text();
    const description = $(".con_view").first().text();

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

    const urlList = $(".cont_post > h2 > a")
      .get()
      .map((item) => {
        return `${this.company.basePath}${item.attribs["href"]}`;
      });

    return urlList;
  };
}

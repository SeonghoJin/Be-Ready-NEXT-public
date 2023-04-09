import { BlogItem, TechBlogInspector } from "./TechBlogInspector";
import * as cherrio from "cheerio";

export class KakaoTechBlogInspector extends TechBlogInspector {
  protected parseArticle = (articleHtml: string): Omit<BlogItem, "href"> => {
    const $ = cherrio.load(articleHtml);

    const title = $("meta[itemprop='name']")
      .get()
      .map((item) => {
        return item.attribs["content"];
      })[0];

    const createdAt = $("meta[itemprop='datePublished']")
      .get()
      .map((item) => {
        return item.attribs["content"];
      })[0];

    const rawText = $(".elementor-widget-wrap p span").text();

    const description = $("meta[itemprop=\"description\"]")
      .get()
      .map((item) => {
        return item.attribs["content"];
      })[0];

    return {
      company: this.company,
      title,
      createdAt,
      rawText,
      description
    };
  };

  protected getNewArticleUrlList = async (): Promise<string[]> => {
    const html = await this.loadArticleListHTML();
    const $ = cherrio.load(html);
    return $("h3.elementor-post__title > a")
      .get()
      .map((item) => {
        return item.attribs["href"];
      });
  };
}

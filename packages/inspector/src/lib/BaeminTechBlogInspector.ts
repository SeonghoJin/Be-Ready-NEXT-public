import { BlogItem, TechBlogInspector } from "./TechBlogInspector";
import * as cherrio from "cheerio";

export class BaeminTechBlogInspector extends TechBlogInspector {
  private readonly monthMap: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };

  formatCreatedAt = (createdAt: string) => {
    const [month, day, year] = createdAt.split(".");
    return [year, this.monthMap[month].toString().padStart(2, "0"), day].join(
      "-"
    );
  };

  protected parseArticle = (articleHtml: string): Omit<BlogItem, "href"> => {

    try {
      const $ = cherrio.load(articleHtml);

      const title = $(".cont-header > h1").text();
      const createdAt = this.formatCreatedAt(
        $(".author > span").first().text().replace(/[ \n]/gi, "")
      );
      const rawText = $(".post-content-inner > p").text();
      const description = $(".post-content-inner > p").first().text();
      return {
        company: this.company,
        title,
        createdAt,
        description,
        rawText
      };
    } catch (e) {
      console.error(`[ERROR] parseArticle error of ${articleHtml}`);
      throw e;
    }
  };

  protected getNewArticleUrlList = async (): Promise<string[]> => {
    const html = await this.loadArticleListHTML();
    const $ = cherrio.load(html);
    return $(".item.firstpaint")
      .get()
      .map((element) => {
        return $(element).find("a")[0]?.attribs?.["href"] ?? "";
      })
      .filter((_) => !!_);
  };
}

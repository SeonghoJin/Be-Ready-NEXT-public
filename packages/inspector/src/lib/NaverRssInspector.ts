import { RssInspector } from "./RssInspector";
import { BlogItem } from "./TechBlogInspector";
import { parserInstance } from "./parserInstance";
import * as cheerio from "cheerio";
import dayjs = require("dayjs");

export class NaverRssInspector extends RssInspector {
  public getNewBlogItemList: () => Promise<BlogItem[]> = async () => {
    if (!this.company?.rssUrl) {
      throw new Error("not defined rssUrl");
    }

    const html = await this.htmlClient.getHtml(this.company.rssUrl);
    return await parserInstance.parse(html)?.feed?.entry?.map((item: any) => {
      const content = `<div>${item?.content}</div>}`;
      const text = cheerio.load(content).text();
      return {
        company: this.company,
        title: item?.title ?? "",
        createdAt: dayjs(item?.updated).format("YYYY-MM-DD") ?? "",
        description: text,
        rawText: text,
        href: item?.id ?? ""
      };
    });

  };
}

import { BlogItem } from "./TechBlogInspector";
import { RssInspector } from "./RssInspector";
import { parserInstance } from "./parserInstance";
import * as cheerio from "cheerio";
import dayjs = require("dayjs");

export class TossTechBlogInspector extends RssInspector {
    getNewBlogItemList = async (): Promise<BlogItem[]> => {
        if (!this.company?.rssUrl) {
            throw new Error("not defined rssUrl");
        }

        const html = await this.htmlClient.getHtml(this.company.rssUrl);

        return await parserInstance.parse(html)?.rss?.channel?.item?.map((item: any) => {
            const $ = cheerio.load(item?.["content:encoded"] ?? "");
            return {
                title: item?.title ?? "",
                rawText: $.text(),
                company: this.company,
                createdAt: dayjs(item?.pubDate).format("YYYY-MM-DD") ?? "",
                description: item?.description ?? "",
                href: item?.link ?? ""
            };
        });
    };
}

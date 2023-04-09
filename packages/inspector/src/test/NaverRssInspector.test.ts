import { CachingClient, FetchHtmlClient } from "@./fetcher";
import { NaverRssInspector } from "../lib/NaverRssInspector";
import { writeOutput } from "./util";

describe("NaverBlogRSSInspector Test", () => {
  it("all", async () => {
    const naverRssInspector = new NaverRssInspector({
      htmlClient: new CachingClient({
        htmlClient: new FetchHtmlClient()
      }),
      company: {
        basePath: "",
        rssUrl: "https://d2.naver.com/d2.atom",
        href: "",
        name: "",
        imageUrl: "",
        id: "Naver"
      }
    });

    (await naverRssInspector.getNewBlogItemList()).forEach((item) => {
      writeOutput(item.href, item);
    });
  });

});

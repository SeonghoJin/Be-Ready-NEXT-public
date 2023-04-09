import { writeOutput } from "./util";
import { NaverTechBlogInspector } from "../lib/NaverTechBlogInspector";
import { CachingClient, PuppetterHtmlClient } from "@./fetcher";

const inspector = new NaverTechBlogInspector({
  htmlClient: new CachingClient({
    htmlClient: new PuppetterHtmlClient()
  }),
  company: {
    basePath: "https://d2.naver.com",
    rssUrl: "https://d2.naver.com/d2.atom",
    href: "https://d2.naver.com",
    name: "",
    imageUrl: "",
    id: "Naver"
  }
});

describe("NaverBlogInspector Test", () => {
  it("1", async () => {
    const url = "https://d2.naver.com/news/3775781";
    const blogItem = await inspector.getNewBlogItem(url);

    console.info(blogItem);
    await writeOutput(url, blogItem);
  });

  it("latest", async () => {
    const blogItem = await inspector.getNewBlogItemList();
    await Promise.allSettled(
      blogItem.map((item) => {
        return writeOutput(item.href, item);
      })
    );
  });
});

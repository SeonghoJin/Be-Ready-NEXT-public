import { writeOutput } from "./util";
import { BaeminTechBlogInspector } from "@./inspector";
import { CachingClient, FetchHtmlClient } from "@./fetcher";

const inspector = new BaeminTechBlogInspector({
  company: {
    basePath: "",
    rssUrl: "",
    href: "https://techblog.woowahan.com/",
    name: "",
    imageUrl: "",
    id: "Baemin"
  },
  htmlClient: new CachingClient({ htmlClient: new FetchHtmlClient() })
});

describe("BaeminInspector Test", () => {
  it("1", async () => {
    const url = "https://techblog.woowahan.com/10593";
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

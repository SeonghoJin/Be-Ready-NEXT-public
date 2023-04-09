import { writeOutput } from "./util";
import { NexonTechBlogInspector } from "../lib/NexonTechBlogInsepector";
import { CachingClient, FetchHtmlClient } from "@./fetcher";

const inspector = new NexonTechBlogInspector({
  htmlClient: new CachingClient({
    htmlClient: new FetchHtmlClient()
  }),
  company: {
    basePath: "https://www.intelligencelabs.tech",
    rssUrl: "",
    href: "https://www.intelligencelabs.tech",
    name: "NEXON",
    imageUrl: "",
    id: "Nexon"
  }
});

describe("NexonBlogInspector Test", () => {
  it("1", async () => {
    const url = "https://www.intelligencelabs.tech/061061d9-4901-4bfa-be82-df013d74baeb";
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

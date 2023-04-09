import { writeOutput } from "./util";
import { CachingClient, FetchHtmlClient } from "@./fetcher";
import { TossTechBlogInspector } from "../lib/TossTechBlogInspector";
import { omit } from "lodash";

const inspector = new TossTechBlogInspector({
  company: {
    basePath: "",
    rssUrl: "https://toss.tech/rss.xml",
    href: "",
    name: "토스",
    imageUrl: "",
    id: "Toss"
  },
  htmlClient: new CachingClient({ htmlClient: new FetchHtmlClient() })
});

describe("TossUIBlogInspector Test", () => {

  it("latest", async () => {
    const blogItem = await inspector.getNewBlogItemList();
    await Promise.allSettled(
      blogItem.map((item) => {
        console.log(`${item.href}`, omit(item, ["rawText"]));
        return writeOutput(item.href, item);
      })
    );
  });
});

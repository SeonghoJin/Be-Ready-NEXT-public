import { writeOutput } from "./util";
import { AutoTrailingSlashHtmlClient, CachingClient, FetchHtmlClient } from "@./fetcher";
import { ToastUITechBlogInspector } from "../lib/ToastUITechBlogInspector";

const inspector = new ToastUITechBlogInspector({
  company: {
    basePath: "https://ui.toast.com",
    rssUrl: "",
    href: "https://ui.toast.com/posts/ko",
    name: "",
    imageUrl: "",
    id: "ToastUI"
  },
  htmlClient: new AutoTrailingSlashHtmlClient({ htmlClient: new CachingClient({ htmlClient: new FetchHtmlClient() }) })
});

describe("ToastUIBlogInspector Test", () => {
  it("1", async () => {
    const url = "https://ui.toast.com/posts/ko_chrome_report_202302";
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

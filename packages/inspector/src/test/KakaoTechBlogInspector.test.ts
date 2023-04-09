import { writeOutput } from "./util";
import { CachingClient, FetchHtmlClient } from "@./fetcher";
import { KakaoTechBlogInspector } from "../lib/KakaoTechBlogInspector";

const inspector = new KakaoTechBlogInspector({
  company: {
    basePath: "",
    rssUrl: "",
    href: "https://tech.kakao.com/blog/",
    name: "",
    imageUrl: "",
    id: "Kakao"
  },
  htmlClient: new CachingClient({ htmlClient: new FetchHtmlClient() })
});

describe("KaKaoBlogInspector Test", () => {
  it("1", async () => {
    const url = "https://tech.kakao.com/2023/03/02/python-and-rust/";
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

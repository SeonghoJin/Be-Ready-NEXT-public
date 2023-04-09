import { BaeminTechBlogInspector } from "./BaeminTechBlogInspector";
import { Company, CompanyNameType, companyName } from "@./common";
import { BlogInspectorApi } from "./BlogInspectorApi";
import { KakaoTechBlogInspector } from "./KakaoTechBlogInspector";
import { AutoTrailingSlashHtmlClient, CachingClient, FetchHtmlClient } from "@./fetcher";
import { ToastUITechBlogInspector } from "./ToastUITechBlogInspector";
import { NaverRssInspector } from "./NaverRssInspector";
import { TechBlogInspectorConstructorArg } from "./TechBlogInspector";
import { NexonTechBlogInspector } from "./NexonTechBlogInsepector";
import { TossTechBlogInspector } from "./TossTechBlogInspector";

const fetchHtmlClient = new FetchHtmlClient();

const htmlClient = new CachingClient({
  htmlClient: new FetchHtmlClient()
});

const isProduction = process.env["NODE_ENV"] === "production";

export const createCompanyMap = (companyList: Company[]) => companyList.map((company) => ({
  [company.id]: company
})).reduce((acc, cur) => ({ ...acc, ...cur }), {}) as unknown as { [p in CompanyNameType]: Company };

const safe = <T>(obj: T): NonNullable<T> => {
  if (obj == null) {
    throw new Error("null or undefined");
  }

  return obj;
}


export const createTechBlogInspectorMap = (companyList: { [p in CompanyNameType]: TechBlogInspectorConstructorArg["company"] | undefined }): {
  [p in CompanyNameType]: BlogInspectorApi;
} => ({
  Nexon: new NexonTechBlogInspector({
    htmlClient: isProduction ? fetchHtmlClient : htmlClient,
    company: safe(companyList.Nexon)
  }),
  Kakao: new KakaoTechBlogInspector({
    htmlClient: isProduction ? fetchHtmlClient : htmlClient,
    company: safe(companyList.Kakao)
  }),
  Naver: new NaverRssInspector({
    htmlClient: isProduction ? fetchHtmlClient : htmlClient,
    company: safe(companyList.Naver)
  }),
  ToastUI: new ToastUITechBlogInspector({
    htmlClient: new AutoTrailingSlashHtmlClient({
      htmlClient: isProduction ? fetchHtmlClient : htmlClient
    }),
    company: safe(companyList.ToastUI)
  }),
  Baemin: new BaeminTechBlogInspector({
    htmlClient: isProduction ? fetchHtmlClient : htmlClient,
    company: safe(companyList.Baemin)
  }),
  Toss: new TossTechBlogInspector({
    htmlClient: isProduction ? fetchHtmlClient : htmlClient,
    company: safe(companyList.Toss)
  })
});

import { CompanyNameType } from "../domain";

export type Company = {
  imageUrl: string;
  href: string;
  name: string;
  basePath?: string | undefined;
  rssUrl?: string | undefined;
  active: boolean;
  count: number;
  id: CompanyNameType
};

export type CompanyDto = Omit<Company, 'active' | 'id'> & {
  averageCount: number;
}

export type Tag = {
  name: string;
  imageUrl: string;
};

export type CompanyArticleDto = Omit<CompanyArticle, "company" | 'rawText' | 'active'> & {
  company: Pick<Company, "href" | "basePath" | "rssUrl" | "imageUrl" | 'id' | 'name'>,
};


export type CompanyArticle = {
  summarize3: [string, string, string];
  title: string;
  company: string;
  createdAt: string;
  like: number;
  href: string;
  viewCount: number;
  tag: string[];
  rawText: string;
  description: string;
  active: boolean
};

export type ContentHeaderItem = {
  name: "최신" | "인기";
  img: string;
};

export type ApiPathType = `/api/v1/${string}`;
export type ExtractTypeOfArray<T extends unknown[] | readonly unknown[]> =
  T[number];

export * from "./timeCollection";

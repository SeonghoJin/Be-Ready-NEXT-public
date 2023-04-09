import { ApiPathType, Company, CompanyArticleDto, ContentHeaderItem, Tag } from "../types";

export type GetCompanyArticleRequest = {
  company: Company["name"][];
  tag: Tag["name"][];
  contentHeader: ContentHeaderItem["name"];
  page: string;
};

export type GetCompanyArticleResponse = {
  article: CompanyArticleDto[];
  page: number;
  count: number;
};

export const getCompanyArticlePath: ApiPathType = "/api/v1/article";
